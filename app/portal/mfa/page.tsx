import MfaForm from "../../../components/portal/MfaForm";

export default function MfaPage() {
  return (
    <div className="lw">
      <a className="logo" href="/" style={{ marginBottom: 28 }}><span>ACCOUNT<b>AX</b></span></a>
      <h1 style={{ fontSize: "2rem" }}>Two-factor authentication</h1>
      <p className="mu">A second step protects the portal even if a password is stolen.</p>
      <MfaForm />
      <p><a href="/portal">Back to the portal</a></p>
    </div>
  );
}
