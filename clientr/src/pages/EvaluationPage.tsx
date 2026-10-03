export default function SubmitDeliverablePage() {
  return (
    <div className="page-stack">
      <section className="panel wide-panel">
        <p className="eyebrow">Freelancer delivery</p>
        <h1>Submit deliverable</h1>

        <div className="grid-two">
          <div className="info-card">
            <h3>Evidence</h3>
            <label><span>Deployment URL</span><input type="text" value="https://proofly-demo.example" /></label>
            <label><span>Repository URL</span><input type="text" value="https://github.com/acme/proofly" /></label>
            <label><span>Notes</span><textarea rows={5} value="Completed responsiveness pass and approved branding." /></label>
          </div>

          <div className="info-card">
            <h3>Requirement checklist</h3>
            <ul className="list-stack">
              <li>Deployment URL reachable</li>
              <li>Home, Pricing, Contact links present</li>
              <li>Approved logo included</li>
              <li>Mobile layout verified</li>
            </ul>
            <button className="primary-button" style={{ marginTop: 18 }}>Submit for verification</button>
          </div>
        </div>
      </section>
    </div>
  );
}
