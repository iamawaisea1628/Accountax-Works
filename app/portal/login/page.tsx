import LoginForm from "../../../components/portal/LoginForm";

export default function LoginPage() {
  return (
    <div className="lw">
      <a className="logo" href="/" style={{ marginBottom: 28 }}><span>ACCOUNT<b>AX</b></span></a>
      <h1 style={{ fontSize: "2rem" }}>Client Portal</h1>
      <p className="mu">Sign in to exchange documents securely with your Accountax team. Access is by invitation only.</p>
      <LoginForm />
    </div>
  );
}
