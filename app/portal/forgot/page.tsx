import { Suspense } from "react";
import ForgotForm from "../../../components/portal/ForgotForm";

export default function ForgotPage() {
  return (
    <div className="lw">
      <a className="logo" href="/" style={{ marginBottom: 28 }}><span>ACCOUNT<b>AX</b></span></a>
      <h1 style={{ fontSize: "2rem" }}>Reset your password</h1>
      <p className="mu">Enter your portal email and we will send you a link to set a new password.</p>
      <Suspense fallback={null}><ForgotForm /></Suspense>
    </div>
  );
}
