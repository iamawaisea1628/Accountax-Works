import SetPasswordForm from "../../../components/portal/SetPasswordForm";

export default function SetPasswordPage() {
  return (
    <div className="lw">
      <a className="logo" href="/" style={{ marginBottom: 28 }}><span>ACCOUNT<b>AX</b></span></a>
      <h1 style={{ fontSize: "2rem" }}>Set your password</h1>
      <p className="mu">Choose a password for your Accountax client portal.</p>
      <SetPasswordForm />
    </div>
  );
}
