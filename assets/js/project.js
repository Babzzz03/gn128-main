/* =============================================================
   GN128 Solutions — dynamic project detail renderer
   Reads ?project=<slug> and populates project.html from PROJECTS.
   Add a new project by adding an entry below — no new HTML file needed.
   ============================================================= */
(function () {
    "use strict";

    const PROJECTS = {
        "crm128": {
            eyebrow: "Design Showcase",
            title: "CRM128",
            lead: "Built for companies and businesses drowning in spreadsheets — from seamless contact management and streamlined HR processes that keep your team organized, to comprehensive projects, inventory and cash-flow management.",
            website: "#",
            appStore: "#",
            image: "",
            challenge: {
                intro: "Businesses were spending more time managing operations than growing their business. From sales and customer management to HR, finance, inventory, projects, and daily administrative tasks, many organizations relied on a patchwork of spreadsheets, paperwork, multiple software applications, and endless email chains. The result was poor collaboration, duplicated work, delayed decision-making, lost opportunities, and frustrated employees struggling to stay aligned across departments.",
                points: [
                    "Business owners and managers spent 20+ hours every week manually coordinating sales, customer records, employee activities, approvals, and operational workflows across disconnected systems.",
                    "Departments frequently worked in silos, making it difficult for teams to share information, collaborate effectively, or maintain a single source of truth.",
                    "Employees struggled with scattered spreadsheets, paper-based processes, and repetitive manual tasks that reduced productivity and slowed business growth.",
                    "Managing customer relationships, invoices, payments, inventory, projects, documents, and employee records across multiple applications increased operational costs."
                ]
            },
            solution: [
                "CRM128 was built to replace disconnected tools with one intelligent business operating system. Instead of juggling spreadsheets, paperwork, emails, messaging apps, and multiple software subscriptions, businesses can manage every department from a single, centralized platform.",
                "CRM128 brings together Customer Relationship Management (CRM), Sales, Human Resources, Finance, Inventory, Procurement, Projects, Customer Support, Marketing, Document Management, and Business Automation into one secure cloud-based ecosystem. Every department works from the same real-time data, enabling teams to collaborate seamlessly while leadership gains complete visibility into business performance."
            ]
        },

        "marketboost": {
            eyebrow: "Search Engine Optimization",
            title: "Organic Growth Strategy for MarketBoost",
            lead: "A targeted SEO and content programme that grew qualified organic traffic by 150% in six months and reduced dependence on paid acquisition.",
            website: "#",
            appStore: "",
            image: "",
            challenge: {
                intro: "MarketBoost relied almost entirely on paid ads for growth. Rising acquisition costs were squeezing margins, while their organic presence was thin and their content wasn't ranking for the terms their buyers were searching.",
                points: [
                    "Customer acquisition cost was climbing every quarter with little organic traffic to offset it.",
                    "Existing content targeted broad, high-competition keywords with low conversion intent.",
                    "No structured internal linking, technical SEO, or content calendar was in place.",
                    "Reporting was fragmented, so the team couldn't see what content actually drove revenue."
                ]
            },
            solution: [
                "We built a data-driven SEO strategy around high-intent, mid-competition keywords, paired with a content engine that published consistently against a clear editorial calendar.",
                "Technical fixes, internal linking, and automated performance dashboards compounded the results — organic traffic grew 150% in the first six months, lowering blended acquisition cost and creating a durable channel that keeps performing."
            ]
        },

        "dkonect-mobile": {
            eyebrow: "Mobile Development",
            title: "Mobile App Development for Dkonect",
            lead: "A user-friendly mobile app that reached a 4.8-star rating and measurably increased customer engagement and retention.",
            website: "#",
            appStore: "#",
            image: "",
            challenge: {
                intro: "Dkonect's customers were engaging through a slow, dated web experience. Retention was dropping and support tickets were rising as users struggled to complete everyday tasks on the go.",
                points: [
                    "The mobile web experience was slow and hard to use, hurting engagement.",
                    "There was no native app, so push notifications and offline access weren't possible.",
                    "Onboarding was confusing, causing drop-off before users saw value.",
                    "The team had no analytics into where users struggled inside the product."
                ]
            },
            solution: [
                "We designed and shipped a fast, intuitive native mobile app with a streamlined onboarding flow, push notifications, and offline-friendly interactions.",
                "Clear in-app analytics let the team iterate quickly on friction points. The app reached a 4.8-star rating, lifting engagement and retention while cutting support load."
            ]
        },

        "fincorp-cloud": {
            eyebrow: "Cloud Migration",
            title: "Enterprise Cloud Migration for Fincorp",
            lead: "A custom cloud infrastructure that cut operational costs by 30% while improving scalability, resilience and security.",
            website: "#",
            appStore: "",
            image: "",
            challenge: {
                intro: "Fincorp ran business-critical systems on ageing on-premise hardware. Costs were high, scaling was painful, and compliance and disaster-recovery requirements were becoming difficult to meet.",
                points: [
                    "Fixed on-premise capacity meant paying for peak load year-round.",
                    "Scaling for growth required long, expensive hardware procurement cycles.",
                    "Disaster recovery and failover were manual and largely untested.",
                    "Meeting security and compliance requirements was increasingly costly."
                ]
            },
            solution: [
                "We designed a secure, right-sized cloud architecture and migrated Fincorp's workloads with zero unplanned downtime, using infrastructure-as-code for repeatable, auditable deployments.",
                "Autoscaling, automated backups, and hardened security controls reduced operational costs by 30% while dramatically improving resilience, scalability, and compliance posture."
            ]
        },

        "retalify": {
            eyebrow: "Web Development",
            title: "E-Commerce Platform for Retalify",
            lead: "A new e-commerce platform built from the ground up that boosted online sales by 75% in the first quarter.",
            website: "#",
            appStore: "",
            image: "",
            challenge: {
                intro: "Retalify had outgrown an off-the-shelf store that was slow, hard to customise, and losing sales at checkout. Their catalogue and promotions couldn't keep up with the way the business actually operated.",
                points: [
                    "Slow page loads and a clunky checkout drove high cart abandonment.",
                    "The rigid platform made merchandising and promotions difficult to manage.",
                    "Inventory and orders weren't synced with their back-office systems.",
                    "There was little insight into which products and journeys converted."
                ]
            },
            solution: [
                "We rebuilt the storefront from the ground up with a fast, mobile-first experience, a frictionless checkout, and flexible merchandising tools the team could control themselves.",
                "Integrations synced inventory, orders, and payments with their operations, and built-in analytics guided ongoing optimisation — boosting online sales by an incredible 75% in the first quarter."
            ]
        },

        "dkonect-data": {
            eyebrow: "Database Management",
            title: "Data Platform Rebuild for Dkonect",
            lead: "A scalable data platform with automated pipelines that improved reporting speed and reliability across every team.",
            website: "#",
            appStore: "",
            image: "",
            challenge: {
                intro: "Dkonect's reporting relied on brittle, manual data exports stitched together in spreadsheets. Numbers rarely matched between teams, and answering a simple business question could take days.",
                points: [
                    "Data lived in disconnected systems with no single source of truth.",
                    "Manual exports were error-prone and impossible to audit.",
                    "Reports were stale by the time they reached decision-makers.",
                    "Scaling analysis meant more manual work, not more insight."
                ]
            },
            solution: [
                "We built a centralised data platform with automated ingestion pipelines, validation, and a governed warehouse that every team could trust.",
                "Self-serve dashboards replaced manual spreadsheets, cutting reporting time from days to minutes and giving leadership reliable, real-time visibility into performance."
            ]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("project") || "crm128";
    const data = PROJECTS[slug] || PROJECTS["crm128"];

    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    // Head + hero
    document.title = `${data.title} — Project · GN128 Solutions`;
    set("crumb-title", data.title);
    set("p-eyebrow", data.eyebrow);
    set("p-title", data.title);
    set("p-lead", data.lead);

    // Action buttons
    const website = document.getElementById("p-website");
    if (website) website.href = data.website || "#";
    const appStore = document.getElementById("p-appstore");
    if (appStore) {
        if (data.appStore) appStore.href = data.appStore;
        else appStore.hidden = true;
    }

    // Showcase image (optional)
    if (data.image) {
        const fig = document.getElementById("p-showcase");
        if (fig) {
            const img = document.createElement("img");
            img.src = data.image;
            img.alt = `${data.title} preview`;
            fig.appendChild(img);
        }
    }

    // Challenge
    set("p-challenge-intro", data.challenge.intro);
    const pts = document.getElementById("p-challenge-points");
    if (pts) {
        pts.innerHTML = "";
        data.challenge.points.forEach((t) => {
            const li = document.createElement("li");
            li.textContent = t;
            pts.appendChild(li);
        });
    }

    // Solution
    const sol = document.getElementById("p-solution");
    if (sol) {
        sol.innerHTML = "";
        data.solution.forEach((t) => {
            const p = document.createElement("p");
            p.textContent = t;
            sol.appendChild(p);
        });
    }
})();
