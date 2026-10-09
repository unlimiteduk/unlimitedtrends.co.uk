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
  "SURPLUS STOCK · USED DEVICES · MIXED CONDITION",
  "IPADS · IPHONES · MACBOOKS · IMACS",
  "WORKING OR FAULTY · CONDITION CHECKED BEFORE OFFER",
  "UK COLLECTION · PAYMENT BY BANK TRANSFER",
];

const procurementRows = [
  ["01", "iPads", "Wi‑Fi / Cellular · 6th gen onward · any colour"],
  ["02", "MacBooks", "Intel + Apple silicon · 2018 onward · mixed condition"],
  ["03", "iMac & Mac mini", "2019 onward · standard or upgraded specifications"],
  [
    "04",
    "iPhone 11–16",
    "Unlocked preferred · screen or casing damage considered",
  ],
  ["05", "Apple Watch", "Series 5 onward · with or without straps and chargers"],
  ["06", "Accessories", "Magic keyboard · chargers · docks · boxed or loose"],
];

const faqRows = [
  [
    "01",
    "Do you take iCloud-locked devices?",
    "No. Devices must be signed out of iCloud and ready to erase. Please check the lock status before sending your stock list.",
  ],
  [
    "02",
    "How do you price the devices?",
    "We consider the model, specification, condition, faults and current resale value. Once we have reviewed your list, we send you a written offer.",
  ],
  [
    "03",
    "Who handles collection?",
    "We arrange collection for agreed purchases. If you prefer to use your own carrier, let us know. We agree the date and arrangements with you first.",
  ],
  [
    "04",
    "When will I be paid?",
    "Payment is by BACS on collection, subject to the checks and terms in our written offer. We confirm these details before you accept.",
  ],
  [
    "05",
    "What if the devices differ from my list?",
    "We tell you about any differences in quantity, model or condition and agree how to resolve them under the offer terms before completing payment.",
  ],
  [
    "06",
    "Can you sign an NDA?",
    "Yes. Send us your NDA or ask for our mutual NDA before sharing confidential stock or business information.",
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
  return (
    <header className="site-nav">
      <div className="nav-status">
        <span>London, UK</span>
        <b>Apple device buyers</b>
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
          Selling to us
        </a>
        <a href="#procure" onClick={() => setOpen(false)}>
          What we buy
        </a>
        <a href="#process" onClick={() => setOpen(false)}>
          How it works
        </a>
        <a href="#evidence" onClick={() => setOpen(false)}>
          Testing & data
        </a>
      </nav>
      <button
        className="nav-cta"
        onClick={() => {
          setOpen(false);
          scrollToId("submission");
        }}
      >
        Get a quote <ArrowUpRight size={15} />
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
        <SectionMeta code="SEC 01" children="APPLE DEVICE BUYERS" />

      </div>
      <div className="hero-copy">
        <div className="eyebrow">SELL YOUR APPLE STOCK</div>
        <h1>
          We buy
          <br />
          Apple devices
          <br />
          <em>in bulk.</em>
        </h1>
        <p className="hero-lede">
          Selling surplus, used or faulty Apple devices? Send us your stock list.
          We review the models and condition, agree a price and arrange collection.
        </p>
        <div className="hero-actions">
          <RuleButton onClick={() => scrollToId("submission")}>
            Get a quote
          </RuleButton>
          <a className="text-link" href="#process">
            How selling works <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="spec-row">
          <span>LOTS 25–500+</span>
          <i /> <span>REVIEW 24–48H</span>
          <i /> <span>BACS PAYMENT ON COLLECTION</span>
          <i /> <span>GRADES A–D + BER</span>
        </div>
      </div>
      <figure className="hero-figure">
        <img
          src={images.hero}
          alt="Technician hands working on a MacBook logic board under a bench lamp"
        />
        <div className="hero-image-marker">APPLE DEVICE REPAIRS</div>
        <EvidenceCaption
          code="LAB-04"
          date="18.09.26"
          label="MacBook logic board repair"
        />
      </figure>
    </section>
  );
}

function IntakeStrip() {
  return (
    <section
      className="intake-strip"
      aria-label="Apple stock we consider"
    >
      <div className="intake-kicker">
        WE BUY
        <br />
        <span>APPLE DEVICES IN BULK</span>
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
        <SectionMeta code="SEC 04" children="SELLING TO US" />
        <div className="brief-heading">
          <div>
            <div className="eyebrow">WHAT WE NEED TO KNOW</div>
            <h2>
              Tell us
              <br />
              <em>what you have.</em>
            </h2>
          </div>
          <p>
            A simple stock list helps us give you a useful quote. Include the
            device models, quantities, condition and collection location.
          </p>
        </div>
        <div className="brief-ledger">
          <div className="brief-lead-cell">
            <span className="data-label">START WITH A STOCK LIST</span>
            <strong>
              Send us
              <br />
              <em>your stock list.</em>
            </strong>
            <p>
              Add serial numbers if you have them, and let us know about any
              faults. The more we know, the more accurately we can price your stock.
            </p>
            <RuleButton onClick={() => scrollToId("submission")}>
              Send your stock list
            </RuleButton>
          </div>
          <div className="brief-gates">
            <article className="brief-gate">
              <span className="gate-index">01</span>
              <div>
                <span className="data-label">DEVICES</span>
                <h3>What is it?</h3>
                <p>
                  List the models, storage sizes and quantities. For iPads, include
                  whether they are Wi-Fi or cellular. Add serial numbers where available.
                </p>
                <div className="gate-mark">SERIAL / MODEL / SPEC</div>
              </div>
            </article>
            <article className="brief-gate">
              <span className="gate-index">02</span>
              <div>
                <span className="data-label">CONDITION</span>
                <h3>What condition is it in?</h3>
                <p>
                  Tell us about battery health, screen damage and other faults.
                  Mixed conditions are welcome. Devices must be free of iCloud locks.
                </p>
                <div className="gate-mark">GRADE / LOCK / FAULT</div>
              </div>
            </article>
            <article className="brief-gate">
              <span className="gate-index">03</span>
              <div>
                <span className="data-label">COLLECTION</span>
                <h3>Where is the stock?</h3>
                <p>
                  Share the collection postcode, how the stock is packed and any
                  deadline. We agree the collection details with you before booking.
                </p>
                <div className="gate-mark">LOCATION / QTY / DATE</div>
              </div>
            </article>
          </div>
        </div>
        <div className="manifest-specimen">
          <div className="specimen-top">
            <span>EXAMPLE STOCK LIST</span>
            <span>TWO SAMPLE ENTRIES</span>
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
            <span>ONE DEVICE PER ROW, WHERE POSSIBLE</span>
            <span>CSV OR EXCEL</span>
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
        <SectionMeta code="SEC 05" children="WHAT WE BUY" />
        <div className="procure-header">
          <h2>
            Apple stock,
            <br />
            <em>working or faulty.</em>
          </h2>
          <p>
            We buy in bulk from businesses, IT suppliers, recyclers and
            liquidators. Send us a single model or a mixed batch of Apple devices.
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
    ["4,000", "DEVICES PER MONTH · CAPACITY"],
    ["12", "REPAIR BENCHES IN USE"],
    ["36", "HOURS · AVERAGE QUOTE RESPONSE"],
    ["14", "YEARS TRADING"],
  ];
  return (
    <section className="capacity-section section-dark">
      <div className="section-shell">
        <SectionMeta code="SEC 06" children="OUR BUSINESS" dark />
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
          <span>BULK BUYING, TESTING & REPAIRS</span>
          <span>CONTACT US ABOUT LARGER QUANTITIES</span>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    [
      "01",
      "SEND YOUR STOCK LIST",
      "Send a CSV or Excel file with models, quantities, condition and collection details.",
      "STEP 1",
    ],
    [
      "02",
      "WE REVIEW YOUR STOCK",
      "We check the list and contact you if we need more information to price it.",
      "24–48 HRS",
    ],
    [
      "03",
      "AGREE A PRICE",
      "Our written offer sets out the price, the expected condition and the collection and payment details.",
      "IN WRITING",
    ],
    [
      "04",
      "COLLECTION & PAYMENT",
      "We arrange collection, check the devices against the agreed list and pay by BACS under the offer terms.",
      "BACS / COLLECTION",
    ],
  ];
  return (
    <section className="section-light process-section" id="process">
      <div className="section-shell">
        <SectionMeta code="SEC 07" children="HOW IT WORKS" />
        <div className="process-intro">
          <h2>
            From stock list
            <br />
            <em>to payment.</em>
          </h2>
          <p>
            Four straightforward steps. You know what we need, what we are
            offering and when your stock will be collected.
          </p>
        </div>
        <div className="process-list">
          {steps.map(([code, name, copy, time], i) => (
            <div className="process-row" key={code}>
              <span className="process-code">{code}</span>
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
    [images.ipads, "INTAKE-02", "18.09.26", "iPads ready for testing"],
    [images.totes, "RACK-07", "16.09.26", "Devices stored for processing"],
    [images.monitor, "LAB-02", "18.09.26", "Device testing"],
    [images.pallet, "DOCK-01", "14.09.26", "Stock prepared for collection"],
    [images.hero, "BENCH-04", "18.09.26", "MacBook component checks"],
    [images.ipads, "INTAKE-05", "12.09.26", "Checking device details"],
  ];
  return (
    <section className="section-light gallery-section">
      <div className="section-shell">
        <SectionMeta code="SEC 08" children="OUR WORK" />
        <div className="gallery-heading">
          <h2>
            Testing, repairs
            <br />
            <em>and preparation.</em>
          </h2>
          <span>TESTING, REPAIRS & COLLECTION</span>
        </div>
        <div className="gallery-grid">
          {tiles.map(([src, code, date, label], i) => (
            <figure
              className={`gallery-tile tile-${i + 1}`}
              key={`${code}-${i}`}
            >
              <img src={src} alt={label} />
              <div className="gallery-overlay">
                DEVICE CHECKS <ArrowUpRight size={15} />
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
      "DATA ERASURE",
      "Devices are erased before resale. Anything awaiting secure erasure is held separately.",
      "Erasure records and device notes",
    ],
    [
      "DEVICE TESTING",
      "We check the main functions of each model and record any faults.",
      "Test results and technician notes",
    ],
    [
      "CONDITION GRADING",
      "We record cosmetic condition and working status, including devices beyond economical repair.",
      "Condition grades and photographs",
    ],
    [
      "BUSINESS DETAILS",
      "We check seller details and keep them with the agreed stock list.",
      "Company and contact details",
    ],
    [
      "COLLECTION RECORDS",
      "We keep collection references and records of the devices received.",
      "Collection and receipt records",
    ],
  ];
  return (
    <section className="section-light evidence-section" id="evidence">
      <div className="section-shell">
        <SectionMeta code="SEC 09" children="TESTING & DATA ERASURE" />
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
              Testing and
              <br />
              <em>data erasure.</em>
            </h2>
            <div className="evidence-table">
              <div className="evidence-table-head">
                <span>CHECK</span>
                <span>WHAT WE DO</span>
                <span>RECORDS AVAILABLE</span>
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
            <span className="data-label">NEED MORE DETAILS?</span>
            <h3>
              Ask us
              <br />
              <em>for the details.</em>
            </h3>
            <p>
              Need testing records, erasure details or company information?
              Contact us and tell us what your business needs.
            </p>
            <a
              className="text-link"
              href="mailto:Help@unlimitedtrends.co.uk?subject=Supplier evidence pack"
            >
              Ask for our records <ArrowUpRight size={17} />
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
        <SectionMeta code="SEC 10" children="ABOUT UNLIMITED TRENDS" />
        <div className="profile-heading">
          <h2>
            About
            <br />
            <em>Unlimited Trends.</em>
          </h2>
          <span className="profile-stamp">
            UNLIMITED TRENDS
            <br />
            COMPANY DETAILS
          </span>
        </div>
        <div className="profile-grid">
          <div>
            <span>COMPANY NAME</span>
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
            <span>BUSINESS CHECKS</span>
            <strong>
              Business verification available
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
          children="GET A QUOTE"
          dark
        />
        <div className="submission-layout">
          <div className="submission-copy">
            <div className="eyebrow eyebrow-dark">TELL US WHAT YOU HAVE</div>
            <h2>
              Ready to
              <br />
              <em>sell your stock?</em>
            </h2>
            <p>
              Tell us what you are selling and where it is. Attach a stock list
              if you have one, or give us the main details below.
            </p>
            <div className="next-steps">
              {[
                [
                  "01",
                  "SEND YOUR DETAILS",
                  "Include models, quantities, condition and location.",
                ],
                [
                  "02",
                  "WE CHECK THE LIST",
                  "We contact you if anything needs clarification.",
                ],
                [
                  "24–48H",
                  "HEAR BACK FROM US",
                  "We send an offer or let you know if the stock is not suitable.",
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
                <span>DEVICE TYPES</span>
                <input placeholder="e.g. iPad / mixed Apple" />
              </label>
              <label>
                <span>TOTAL UNITS</span>
                <input placeholder="Approx. count" />
              </label>
              <label>
                <span>CONDITION</span>
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
                <span>ASKING PRICE</span>
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
                    <strong>Stock list selected</strong>
                    <span>Ready to send</span>
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
                    <strong>ATTACH YOUR STOCK LIST</strong>
                    <span>Drop file here or browse · CSV or Excel</span>
                  </div>
                </>
              )}
            </div>
            <div className="form-actions">
              <span>
                Sending an enquiry does not commit you to selling. We agree the
                price and terms with you first.
              </span>
              <button className="rule-button rule-button-voltage" type="submit">
                <span>{sent ? "Enquiry sent" : "Request a quote"}</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
            {sent && (
              <p className="success-message">
                Thank you for your enquiry. We will review your stock details
                and get back to you.
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
        <SectionMeta code="SEC 12" children="COMMON QUESTIONS" />
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
        <SectionMeta code="SEC 13" children="CONTACT US" />
        <div className="close-copy">
          <h2>
            Apple stock
            <br />
            <em>to sell?</em>
          </h2>
          <RuleButton onClick={() => scrollToId("submission")}>
            Get a quote
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
          <span>UNLIMITED TRENDS LTD</span>
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
        GET A QUOTE <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
