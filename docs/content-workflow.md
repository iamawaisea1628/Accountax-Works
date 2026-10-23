# Content review workflow

Statuses: `draft` -> `in_review` -> `published` -> `paused` -> `retired`.

| Step | Who | Done when |
|---|---|---|
| Draft | Claude or owner | Record added with `status: "draft"`; not routed, not in sitemap |
| Facts check | Owner | Service is really delivered; for a country-service, authorization status is `approved` or `not_required` |
| Sources | Owner/Claude | Any tax, legal or regulatory statement has `sources` with official URL and retrieval date |
| Approve | Owner | `reviewer`, `lastReviewedAt`, `reviewDueAt` set; status -> `published` |
| Gate | Anyone | `npm run content:report` and `npm test` pass |
| Maintain | Owner | Before `reviewDueAt`, re-review or set `paused`. Overdue published records block the report |

Rules enforced by code: published country-services need review metadata and sources; a country listed as a market never publishes its services automatically; drafts and paused records have no route and are not in the sitemap.
