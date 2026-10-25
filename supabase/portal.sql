-- Run once in the Supabase SQL editor (safe to re-run).
-- Then: Auth settings > turn OFF "Allow new users to sign up" (portal is invite-only).
-- Create each client in Auth > Users > Add user (set a password, auto-confirm). A profile row is created automatically.
-- Make yourself staff:  update public.profiles set role = 'staff' where email = 'YOUR_EMAIL';

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text, full_name text,
  role text not null default 'client' check (role in ('client','staff')),
  created_at timestamptz not null default now()
);
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  name text not null, path text not null unique, size_bytes bigint,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.documents enable row level security;

create or replace function public.is_staff() returns boolean
language sql security definer set search_path = public stable
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'staff') $$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public
as $$ begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', '')) on conflict do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
insert into public.profiles (id, email) select id, email from auth.users on conflict do nothing;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff());
drop policy if exists docs_select on public.documents;
create policy docs_select on public.documents for select to authenticated using (client_id = auth.uid() or public.is_staff());
drop policy if exists docs_insert on public.documents;
create policy docs_insert on public.documents for insert to authenticated
  with check (uploaded_by = auth.uid() and (client_id = auth.uid() or public.is_staff()));
drop policy if exists docs_delete on public.documents;
create policy docs_delete on public.documents for delete to authenticated using (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('client-docs', 'client-docs', false, 20971520, array[
  'application/pdf','text/csv','application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','image/jpeg'])
on conflict (id) do update set public = false, file_size_limit = 20971520, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists cd_select on storage.objects;
create policy cd_select on storage.objects for select to authenticated
  using (bucket_id = 'client-docs' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));
drop policy if exists cd_insert on storage.objects;
create policy cd_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'client-docs' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff()));
drop policy if exists cd_delete on storage.objects;
create policy cd_delete on storage.objects for delete to authenticated using (bucket_id = 'client-docs' and public.is_staff());
