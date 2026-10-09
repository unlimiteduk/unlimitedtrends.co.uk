import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  FileText,
  Menu,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";

const images = {
  hero: "/manus-storage/hero-logic-board_ce3eac84.webp",
  ipads: "/manus-storage/ipad-mat_5c09d32c.webp",
  totes: "/manus-storage/tote-rack_4c1d8450.webp",
  monitor: "/manus-storage/diagnostic-monitor_326effeb.webp",
  pallet: "/manus-storage/pallet-floor_13e99a8e.webp",
};

const intakeRows = [
  "2026-09-14 · 240× IPAD AIR 4 · GRADE B/C · MANCHESTER · SETTLED",
  "2026-09-11 · 96× MACBOOK PRO M1 · MIXED FAULT · LEEDS · SETTLED",
  "2026-09-09 · 412× IPHONE 13 · GRADE A/B · BRISTOL · SETTLED",
  "2026-09-06 · 58× IMAC 24-IN · GRADE C · GLASGOW · SETTLED",
];

const procurementRows = [
  ["01", "iPads", "Wi‑Fi / Cellular · 6th gen onward · any colour"],
  ["02", "MacBooks", "Intel + Apple silicon · 2018 onward · mixed condition"],
  ["03", "iMac & Mac mini", "2019 onward · base / upgraded · bench tested"],
  [
    "04",
    "iPhone 11–16",
    "Unlocked preferred · screen / housing grades accepted",
  ],
  ["05", "Apple Watch", "Series 5 onward · strap / charger variance logged"],
  ["06", "Accessories", "Magic keyboard · chargers · docks · boxed or loose"],
];

const faqRows = [
  [
    "01",
    "Do you take iCloud-locked devices?",
    "No. We only purchase devices that can be signed out or are demonstrably ready for secure wipe. Lock status is recorded in the manifest and checked during serial review.",
  ],
  [
    "02",
    "How is pricing calculated?",
    "We price against model, specification, cosmetic grade, functional status, lock status and current channel demand. A written offer follows serial-level review.",
  ],
  [
    "03",
    "Who handles collection?",
    "For accepted lots we arrange collection with our carrier network or work with your nominated logistics partner. Collection windows are agreed in the written offer.",
  ],
  [
    "04",
    "When is payment released?",
    "Settlement is made by BACS on collection, subject to the agreed reconciliation and any variance already documented in the offer.",
  ],
  [
    "05",
    "What if the intake differs from the manifest?",
    "We flag variance by serial and grade, share the reconciliation, and resolve against the written offer before the final settlement record is closed.",
  ],
  [
    "06",
    "Can you sign an NDA?",
    "Yes. Send the NDA with your manifest or ask for our standard mutual NDA before sharing sensitive lot information.",
  ],
];

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionMeta({
  code,
  children,
  dark = false,
}: {
  code: string;
  children: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-meta ${dark ? "section-meta-dark" : ""}`}>
      <span>{code}</span>
      <i aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function EvidenceCaption({
  code,
  date,
  label,
  dark = false,
}: {
  code: string;
  date: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={`evidence-caption ${dark ? "evidence-caption-dark" : ""}`}>
      <span>{code}</span>
      <span>{date}</span>
      <span>{label}</span>
    </div>
  );
}

function RuleButton({
  children,
  onClick,
  dark = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  dark?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      className={`rule-button ${dark ? "rule-button-dark" : ""}`}
      onClick={onClick}
      type={type}
    >
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={1.5} />
    </button>
  );
}

function AppNav({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <header className="site-nav">
      <div className="nav-status">
        <span>UK / {time || "--:--:--"}</span>
        <b>DESK OPEN</b>
      </div>
      <a
        className="wordmark"
        href="#top"
        onClick={() => setOpen(false)}
        aria-label="Unlimited Trends home"
      >
        UNLIMITED<span>·</span>TRENDS
      </a>
      <nav className={`nav-links ${open ? "nav-links-open" : ""}`}>
        <a href="#intake-brief" onClick={() => setOpen(false)}>
          Intake brief
        </a>
        <a href="#procure" onClick={() => setOpen(false)}>
          What we procure
        </a>
        <a href="#process" onClick={() => setOpen(false)}>
          Process
        </a>
        <a href="#evidence" onClick={() => setOpen(false)}>
          Evidence
        </a>
      </nav>
      <button
        className="nav-cta"
        onClick={() => {
          setOpen(false);
          scrollToId("submission");
        }}
      >
        Submit a manifest <ArrowUpRight size={15} />
      </button>
      <button
        className="menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-light" id="top">
      <div className="hero-aside">
        <SectionMeta code="SEC 01" children="PROCUREMENT" />
        <span className="hero-index">01—13</span>
      </div>
      <div className="hero-copy">
        <div className="eyebrow">BUYER / APPLE HARDWARE / UK</div>
        <h1>
          We buy the
          <br />
          Apple stock
          <br />
          <em>others decline.</em>
        </h1>
        <p className="hero-lede">
          Bulk lots from the people who already know what is in them. 25–500+
          Apple devices, reviewed at serial level, collected on your timeline.
        </p>
        <div className="hero-actions">
          <RuleButton onClick={() => scrollToId("submission")}>
            Submit a manifest
          </RuleButton>
          <a className="text-link" href="#process">
            See how intake works <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="spec-row">
          <span>LOTS 25–500+</span>
          <i /> <span>REVIEW 24–48H</span>
          <i /> <span>SETTLEMENT BACS ON COLLECTION</span>
          <i /> <span>GRADES A–D + BER</span>
        </div>
      </div>
      <figure className="hero-figure">
        <img
          src={images.hero}
          alt="Technician hands working on a MacBook logic board under a bench lamp"
        />
        <div className="hero-image-marker">EVIDENCE / 01</div>
        <EvidenceCaption
          code="LAB-04"
          date="18.09.26"
          label="logic board / bench review"
        />
      </figure>
    </section>
  );
}

function IntakeStrip() {
  return (
    <section
      className="intake-strip"
      aria-label="Recent representative intake records"
    >
      <div className="intake-kicker">
        LIVE INTAKE
        <br />
        <span>REPRESENTATIVE RECORDS</span>
      </div>
      <div className="marquee-window">
        <div className="marquee-track">
          {[...intakeRows, ...intakeRows].map((row, i) => (
            <span
              key={`${row}-${i}`}
              className={i % 2 === 0 ? "intake-accent" : ""}
            >
              {row}
              <b>⟩</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntakeBrief() {
  return (
    <section className="section-light intake-brief-section" id="intake-brief">
      <div className="section-shell intake-brief-shell">
        <SectionMeta code="SEC 04" children="INTAKE BRIEF" />
        <div className="brief-heading">
          <div>
            <div className="eyebrow">ROUGH-CUT / BUYING DESK NOTES</div>
            <h2>
              Show us the
              <br />
              <em>shape</em> of the lot.
            </h2>
          </div>
          <p>
            Not a calculator. A clear read on the information that turns a pile
            of Apple hardware into a lot we can actually buy.
          </p>
        </div>
        <div className="brief-ledger">
          <div className="brief-lead-cell">
            <span className="data-label">THE SHORT VERSION</span>
            <strong>
              Volume is useful.
              <br />
              <em>Specificity is leverage.</em>
            </strong>
            <p>
              If you have the serials, the condition mix and a realistic
              collection point, you are already ahead of the queue.
            </p>
            <RuleButton onClick={() => scrollToId("submission")}>
              Send the lot through
            </RuleButton>
          </div>
          <div className="brief-gates">
            <article className="brief-gate">
              <span className="gate-index">01</span>
              <div>
                <span className="data-label">IDENTITY</span>
                <h3>What is it?</h3>
                <p>
                  Model, storage, connectivity and serial. A manifest that names
                  the hardware lets us move from “interesting” to “reviewable”.
                </p>
                <div className="gate-mark">SERIAL / MODEL / SPEC</div>
              </div>
            </article>
            <article className="brief-gate">
              <span className="gate-index">02</span>
              <div>
                <span className="data-label">CONDITION</span>
                <h3>What state is it in?</h3>
                <p>
                  A–D, BER, battery notes, screen damage and lock status. Mixed
                  lots are fine when the variance is visible.
                </p>
                <div className="gate-mark">GRADE / LOCK / FAULT</div>
              </div>
            </article>
            <article className="brief-gate">
              <span className="gate-index">03</span>
              <div>
                <span className="data-label">MOVEMENT</span>
                <h3>How does it leave?</h3>
                <p>
                  Location, pallet or tote count and the collection window. We
                  price the lot, then plan the handover around the real world.
                </p>
                <div className="gate-mark">LOCATION / QTY / DATE</div>
              </div>
            </article>
          </div>
        </div>
        <div className="manifest-specimen">
          <div className="specimen-top">
            <span>MANIFEST / EXAMPLE ROW</span>
            <span>UT-INTAKE-240 / 18.09.26</span>
          </div>
          <div className="specimen-row">
            <b>001</b>
            <span>MacBook Pro 14</span>
            <span>M1 Pro · 16GB · 512GB</span>
            <span>GRADE B</span>
            <span>UNLOCKED</span>
            <span>MCR</span>
          </div>
          <div className="specimen-row specimen-faded">
            <b>002</b>
            <span>iPad Air 4</span>
            <span>64GB · Wi‑Fi</span>
            <span>GRADE C</span>
            <span>ERASED</span>
            <span>LEEDS</span>
          </div>
          <div className="specimen-footer">
            <span>ONE GOOD ROW BEATS A VAGUE SPREADSHEET</span>
            <span>CSV / XLSX / SERIAL-LEVEL REVIEW</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcurementIndex() {
  return (
    <section className="section-light procurement-section" id="procure">
      <div className="section-shell">
        <SectionMeta code="SEC 05" children="WHAT WE PROCURE" />
        <div className="procure-header">
          <h2>
            Whole lots.
            <br />
            <em>Specific appetite.</em>
          </h2>
          <p>
            We are not a consumer shop. We buy structured volume from
            professional sellers and move it through an operational intake.
          </p>
        </div>
        <div className="procure-list">
          {procurementRows.map(([num, title, note]) => (
            <a className="procure-row" href="#submission" key={num}>
              <span className="row-number">{num}</span>
              <strong>{title}</strong>
              <span className="row-note">{note}</span>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capacity() {
  const stats = [
    ["4,000", "DEVICES / MONTHLY INTAKE CAPACITY"],
    ["12", "REPAIR BENCHES IN USE"],
    ["36", "HOURS / AVERAGE MANIFEST RESPONSE"],
    ["14", "YEARS TRADING"],
  ];
  return (
    <section className="capacity-section section-dark">
      <div className="section-shell">
        <SectionMeta code="SEC 06" children="CAPACITY IN NUMBERS" dark />
        <div className="capacity-grid">
          {stats.map(([number, label]) => (
            <div className="capacity-cell" key={label}>
              <strong>
                {number}
                <small>
                  {label.includes("HOURS")
                    ? "h"
                    : label.includes("YEARS")
                      ? "yr"
                      : "×"}
                </small>
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="capacity-foot">
          <span>MEASURED / 12 MONTH ROLLING AVERAGE</span>
          <span>UPDATED 18.09.26 / 17:52 GMT</span>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    [
      "01",
      "UPLOAD MANIFEST",
      "Send a CSV or XLSX with model, serial, condition, lock status and location.",
      "≤ 2 HRS",
    ],
    [
      "02",
      "SERIAL-LEVEL REVIEW",
      "We review the shape of the lot, ask the missing questions, and return a clear written position.",
      "24–48 HRS",
    ],
    [
      "03",
      "BINDING WRITTEN OFFER",
      "The offer records grade mix, variance rules, collection window and settlement terms.",
      "IN WRITING",
    ],
    [
      "04",
      "COLLECTION / PAYMENT",
      "Collection is booked, the manifest is reconciled against intake, and BACS is released on collection.",
      "BACS / COLLECTION",
    ],
  ];
  return (
    <section className="section-light process-section" id="process">
      <div className="section-shell">
        <SectionMeta code="SEC 07" children="PROCESS / FOUR GATES" />
        <div className="process-intro">
          <h2>
            Less theatre.
            <br />
            <em>More traceability.</em>
          </h2>
          <p>
            A purchasing process built for people who need an answer, not
            another portal login.
          </p>
        </div>
        <div className="process-list">
          {steps.map(([code, name, copy, time], i) => (
            <div className="process-row" key={code}>
              <span className="process-code">{code} / GATE</span>
              <div className="process-name">
                <strong>{name}</strong>
                <p>{copy}</p>
              </div>
              <b className="process-time">{time}</b>
              <div className="progress-rule">
                <span style={{ width: `${(i + 1) * 25}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationGallery() {
  const tiles = [
    [images.ipads, "INTAKE-02", "18.09.26", "iPad rows / anti-static mat"],
    [images.totes, "RACK-07", "16.09.26", "tote / chain-of-custody hold"],
    [images.monitor, "LAB-02", "18.09.26", "diagnostics / screen evidence"],
    [images.pallet, "DOCK-01", "14.09.26", "pallet / collection ready"],
    [images.hero, "BENCH-04", "18.09.26", "logic board / component review"],
    [images.ipads, "INTAKE-05", "12.09.26", "serial capture / close range"],
  ];
  return (
    <section className="section-light gallery-section">
      <div className="section-shell">
        <SectionMeta code="SEC 08" children="INSIDE THE OPERATION" />
        <div className="gallery-heading">
          <h2>
            What the
            <br />
            <em>paperwork</em> points to.
          </h2>
          <span>EXHIBIT INDEX / 06 FRAMES</span>
        </div>
        <div className="gallery-grid">
          {tiles.map(([src, code, date, label], i) => (
            <figure
              className={`gallery-tile tile-${i + 1}`}
              key={`${code}-${i}`}
            >
              <img src={src} alt={label} />
              <div className="gallery-overlay">
                VIEW EXHIBIT <ArrowUpRight size={15} />
              </div>
              <EvidenceCaption code={code} date={date} label={label} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  const rows = [
    [
      "DATA SANITISATION",
      "Devices are wiped or held for secure erasure before resale pathways are confirmed.",
      "Wipe log / serial exception record",
    ],
    [
      "DIAGNOSTIC PLATFORM",
      "Functional checks are run against a repeatable bench checklist for relevant models.",
      "Diagnostic output / operator record",
    ],
    [
      "GRADING STANDARD",
      "A–D plus BER grades are recorded against cosmetic and functional condition.",
      "Grade key / intake photographs",
    ],
    [
      "BUSINESS VERIFICATION",
      "We verify counterparties and keep the agreed business details with the lot record.",
      "Company details / contact trail",
    ],
    [
      "CHAIN OF CUSTODY",
      "Collection references, tote or pallet IDs and reconciliation notes stay linked.",
      "Carrier record / receiving log",
    ],
  ];
  return (
    <section className="section-light evidence-section" id="evidence">
      <div className="section-shell">
        <SectionMeta code="SEC 09" children="EVIDENCE / COMPLIANCE" />
        <div
          aria-label="Diagnostics and data erasure platforms"
          style={{
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            padding: "24px 0",
            marginBottom: "48px",
          }}
        >
          <span className="data-label">DIAGNOSTICS &amp; DATA ERASURE</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px 48px",
              marginTop: "12px",
            }}
          >
            <a href="https://www.phonecheck.com/" aria-label="Visit Phonecheck">
              <img
                src="/phonecheck.svg"
                alt="Phonecheck"
                width={201}
                height={46}
                loading="lazy"
                style={{ display: "block", width: "220px", maxWidth: "100%", height: "auto" }}
              />
            </a>
            <a href="https://blancco.com/" aria-label="Visit Blancco">
              <img
                src="/blancco.svg"
                alt="Blancco"
                width={330}
                height={130}
                loading="lazy"
                style={{ display: "block", width: "250px", maxWidth: "100%", height: "auto" }}
              />
            </a>
          </div>
        </div>
        <div className="evidence-layout">
          <div>
            <h2>
              Specific claims.
              <br />
              <em>Retained evidence.</em>
            </h2>
            <div className="evidence-table">
              <div className="evidence-table-head">
                <span>TRUST SIGNAL</span>
                <span>WHAT WE DO</span>
                <span>EVIDENCE WE PROVIDE</span>
              </div>
              {rows.map(row => (
                <div className="evidence-table-row" key={row[0]}>
                  <strong>{row[0]}</strong>
                  <span>{row[1]}</span>
                  <span>{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="evidence-pack">
            <ShieldCheck size={25} strokeWidth={1.5} />
            <span className="data-label">SUPPLIER PACK / REQUEST</span>
            <h3>
              Ask for the
              <br />
              <em>evidence pack.</em>
            </h3>
            <p>
              We can share the practical records that support the way we buy,
              review, collect and settle.
            </p>
            <a
              className="text-link"
              href="mailto:Help@unlimitedtrends.co.uk?subject=Supplier evidence pack"
            >
              Request supplier pack <ArrowUpRight size={17} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BuyerProfile() {
  return (
    <section className="profile-section section-light">
      <div className="section-shell">
        <SectionMeta code="SEC 10" children="VERIFIED BUYER PROFILE" />
        <div className="profile-heading">
          <h2>
            A buyer you
            <br />
            <em>can file.</em>
          </h2>
          <span className="profile-stamp">
            COLophon / 2026
            <br />
            VERIFIED BUYER
          </span>
        </div>
        <div className="profile-grid">
          <div>
            <span>ENTITY NAME</span>
            <strong>Unlimited Trends Ltd</strong>
          </div>
          <div>
            <span>COMPANY REGISTRATION</span>
            <strong>11125418</strong>
          </div>
          <div>
            <span>VAT NUMBER</span>
            <strong>GB 497163551</strong>
          </div>
          <div>
            <span>REGISTERED ADDRESS</span>
            <strong>
              Office No 23
              <br />
              Whitton, London / TW2 7LB / UK
            </strong>
          </div>
          <div>
            <span>PURCHASING CONTACT</span>
            <strong>Help@unlimitedtrends.co.uk</strong>
          </div>
          <div>
            <span>REFERENCES</span>
            <strong>
              Bank and trade references
              <br />
              available on request
            </strong>
          </div>
          <div>
            <span>READINESS</span>
            <strong>
              AML / KYC ready
              <br />
              Mutual NDA available
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Submission() {
  const [attached, setAttached] = useState(false);
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(false);

    const form = e.currentTarget;
    const fieldNames = [
      "company",
      "contact",
      "email",
      "phone",
      "category",
      "total_units",
      "condition_mix",
      "lock_status",
      "location",
      "collection_deadline",
      "price_expectation",
      "manifest",
    ];
    form
      .querySelectorAll<HTMLInputElement>("input:not([type='hidden'])")
      .forEach((input, index) => {
        input.name = fieldNames[index];
      });

    const response = await fetch("https://formspree.io/f/mrpbpzoo", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) setSent(true);
  };
  return (
    <section className="submission-section section-dark" id="submission">
      <div className="section-shell">
        <SectionMeta
          code="SEC 11"
          children="SUBMISSION / MANIFEST INTAKE"
          dark
        />
        <div className="submission-layout">
          <div className="submission-copy">
            <div className="eyebrow eyebrow-dark">INTAKE / NEXT ACTIONS</div>
            <h2>
              Send the
              <br />
              <em>lot through.</em>
            </h2>
            <p>
              Give us enough to make the first call useful. We will come back
              with the missing questions, not a generic acknowledgement.
            </p>
            <div className="next-steps">
              {[
                [
                  "00:00",
                  "FILE RECEIVED",
                  "Your manifest is logged against a new intake record.",
                ],
                [
                  "≤ 02:00",
                  "FIRST REVIEW",
                  "We check the shape, volume and obvious exceptions.",
                ],
                [
                  "24–48H",
                  "WRITTEN POSITION",
                  "You receive an offer, a question set, or a clear decline.",
                ],
              ].map(([time, title, copy]) => (
                <div className="next-row" key={time}>
                  <span>{time}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="manifest-form" onSubmit={submit}>
            <input type="hidden" name="_cc" value="madebyosama@gmail.com" />
            <div className="form-grid">
              <label>
                <span>COMPANY</span>
                <input required placeholder="Company name" />
              </label>
              <label>
                <span>CONTACT</span>
                <input required placeholder="Full name" />
              </label>
              <label>
                <span>WORK EMAIL</span>
                <input required type="email" placeholder="you@company.co.uk" />
              </label>
              <label>
                <span>PHONE</span>
                <input placeholder="+44" />
              </label>
              <label>
                <span>CATEGORY</span>
                <input placeholder="e.g. iPad / mixed Apple" />
              </label>
              <label>
                <span>TOTAL UNITS</span>
                <input placeholder="Approx. count" />
              </label>
              <label>
                <span>CONDITION MIX</span>
                <input placeholder="A / B / C / D / BER" />
              </label>
              <label>
                <span>LOCK STATUS</span>
                <input placeholder="Unlocked / mixed" />
              </label>
              <label>
                <span>LOCATION</span>
                <input placeholder="Town / postcode" />
              </label>
              <label>
                <span>COLLECTION DEADLINE</span>
                <input placeholder="Date or flexible" />
              </label>
              <label className="field-wide">
                <span>PRICE EXPECTATION</span>
                <input placeholder="Optional — per unit or total" />
              </label>
            </div>
            <div
              className={`drop-zone ${dragging ? "dragging" : ""}`}
              onDragOver={e => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => {
                e.preventDefault();
                setDragging(false);
                setAttached(true);
              }}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                hidden
                onChange={() => setAttached(true)}
              />
              {attached ? (
                <>
                  <FileText size={21} />
                  <div>
                    <strong>manifest_apple_lot_240.csv</strong>
                    <span>48 KB · 240 rows · attached</span>
                  </div>
                  <X
                    size={18}
                    onClick={e => {
                      e.stopPropagation();
                      setAttached(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <UploadCloud size={23} />
                  <div>
                    <strong>ATTACH CSV / XLSX MANIFEST</strong>
                    <span>Drop file here or browse · max 10 MB</span>
                  </div>
                </>
              )}
            </div>
            <div className="form-actions">
              <span>
                By sending this form you are starting a conversation, not
                accepting an offer.
              </span>
              <button className="rule-button rule-button-voltage" type="submit">
                <span>{sent ? "Manifest queued" : "Send intake record"}</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
            {sent && (
              <p className="success-message">
                RECEIVED / We have your intake record. A buyer will respond
                within the stated review window.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-light faq-section">
      <div className="section-shell">
        <SectionMeta code="SEC 12" children="FAQ / SMALL PRINT" />
        <div className="faq-layout">
          <h2>
            Questions we
            <br />
            <em>get asked.</em>
          </h2>
          <div className="faq-list">
            {faqRows.map(([num, q, a], i) => (
              <div
                className={`faq-row ${open === i ? "faq-open" : ""}`}
                key={num}
              >
                <button onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{num}</span>
                  <strong>{q}</strong>
                  <ChevronDown size={20} />
                </button>
                {open === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CloseSection() {
  return (
    <section className="close-section section-light">
      <div className="section-shell">
        <SectionMeta code="SEC 13" children="CLOSE / BUYING DESK" />
        <div className="close-copy">
          <h2>
            Have a lot?
            <br />
            <em>Start here.</em>
          </h2>
          <RuleButton onClick={() => scrollToId("submission")}>
            Submit a manifest
          </RuleButton>
        </div>
        <footer className="footer-strip">
          <span>UNLIMITED TRENDS LTD / 11125418 / VAT GB 497163551</span>
          <span>OFFICE NO 23, WHITTON, LONDON / TW2 7LB</span>
          <span>
            <a href="mailto:Help@unlimitedtrends.co.uk">
              HELP@UNLIMITEDTRENDS.CO.UK
            </a>
          </span>
          <span>PRIVACY / TERMS / UT-13-2026</span>
        </footer>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  return (
    <div className="site-frame">
      <AppNav open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <IntakeStrip />
        <IntakeBrief />
        <ProcurementIndex />
        <Capacity />
        <Process />
        <OperationGallery />
        <Evidence />
        <BuyerProfile />
        <Submission />
        <FAQ />
        <CloseSection />
      </main>
      <a className="mobile-sticky-cta" href="#submission">
        SUBMIT A MANIFEST <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
