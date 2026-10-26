export default function NotReady() {
  return (
    <div className="lw">
      <h1 style={{ fontSize: "2rem" }}>Account not ready</h1>
      <p className="mu">Your sign-in worked, but your portal profile has not been set up yet. Please contact Accountax.</p>
      <form method="post" action="/portal/signout"><button className="btn o" type="submit">Sign out</button></form>
    </div>
  );
}
