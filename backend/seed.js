
import "dotenv/config";
import mongoose from "mongoose";

import { User } from "./models/User.model.js";
import { Contact } from "./models/Contact.model.js";
import { Lead } from "./models/Lead.model.js";
import { Task } from "./models/Task.model.js";
import { Note } from "./models/Note.model.js";

const MONGODB_URI = process.env.MONGO_URI;
const WIPE = !process.argv.includes("--keep");

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomItem = (array) =>
  array[randomInt(0, array.length - 1)];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to ${MONGODB_URI}`);

    if (WIPE) {
      await Promise.all([
        User.deleteMany({}),
        Contact.deleteMany({}),
        Lead.deleteMany({}),
        Task.deleteMany({}),
        Note.deleteMany({}),
      ]);

      console.log("Cleared existing collections");
    }

    // ── Users ───────────────────────────────────────────────────────────

    const users = await User.create([
      {
        name: "Karthikeya",
        email: "msuhas@crita.in",
        password: "Password123",
        role: "admin",
        company: "Crita Creative",
      },
    ]);

    console.log(`Seeded ${users.length} users`);

    const ownerFor = (i) =>
      users[i % users.length]._id;

    // ── Contacts ────────────────────────────────────────────────────────

    const contactSeeds = [
      {
        name: "Meera Iyer",
        email: "meera@northgate.io",
        phone: "+91 98765 43210",
        company: "Northgate Ltd",
        title: "VP Operations",
      },
      {
        name: "Daniel Cho",
        email: "daniel@brightpath.com",
        phone: "+1 415 555 0134",
        company: "BrightPath Inc",
        title: "CTO",
      },
      {
        name: "Fatima Rahman",
        email: "fatima@oreno.co",
        phone: "+44 7700 900123",
        company: "Oreno Co",
        title: "Head of Growth",
      },
      {
        name: "Liam Turner",
        email: "liam@vertexlabs.dev",
        phone: "+61 4 1234 5678",
        company: "Vertex Labs",
        title: "Founder",
      },
      {
        name: "Sofia Marchetti",
        email: "sofia@duomo.it",
        phone: "+39 345 678 9012",
        company: "Duomo Group",
        title: "Procurement Lead",
      },
      {
        name: "Kenji Watanabe",
        email: "kenji@sakuratech.jp",
        phone: "+81 90 1234 5678",
        company: "Sakura Tech",
        title: "Product Manager",
      },
      {
        name: "Elena Petrova",
        email: "elena@nordvik.no",
        phone: "+47 412 34 567",
        company: "Nordvik AS",
        title: "COO",
      },
      {
        name: "Carlos Mendoza",
        email: "carlos@andina.mx",
        phone: "+52 55 1234 5678",
        company: "Andina Solutions",
        title: "Sales Director",
      },
      {
        name: "Aisha Bello",
        email: "aisha@lagosworks.ng",
        phone: "+234 802 345 6789",
        company: "LagosWorks",
        title: "Founder",
      },
      {
        name: "Tom Fletcher",
        email: "tom@rivergate.co.uk",
        phone: "+44 7911 123456",
        company: "Rivergate Consulting",
        title: "Managing Partner",
      },
      {
        name: "Nadia Kowalski",
        email: "nadia@polstar.pl",
        phone: "+48 601 234 567",
        company: "Polstar Group",
        title: "Marketing Lead",
      },
      {
        name: "Ravi Chandran",
        email: "ravi@meridiantech.in",
        phone: "+91 90000 12345",
        company: "Meridian Tech",
        title: "Engineering Head",
      },
      {
        name: "Hannah Kim",
        email: "hannah@seoulbyte.kr",
        phone: "+82 10 2345 6789",
        company: "SeoulByte",
        title: "CEO",
      },
      {
        name: "Marco Rossi",
        email: "marco@venetoworks.it",
        phone: "+39 320 456 7890",
        company: "Veneto Works",
        title: "Operations Manager",
      },
      {
        name: "Grace Adeyemi",
        email: "grace@sunriseco.za",
        phone: "+27 82 345 6789",
        company: "Sunrise & Co",
        title: "Business Development",
      },
      {
        name: "Peter Novak",
        email: "peter@brnotech.cz",
        phone: "+420 601 234 567",
        company: "Brno Tech",
        title: "CTO",
      },
      {
        name: "Isabella Alves",
        email: "isabella@saopauloapps.br",
        phone: "+55 11 91234 5678",
        company: "SaoPaulo Apps",
        title: "Founder",
      },
      {
        name: "Yusuf Demir",
        email: "yusuf@bosphorusgroup.tr",
        phone: "+90 532 123 4567",
        company: "Bosphorus Group",
        title: "VP Sales",
      },
      {
        name: "Olivia Bennett",
        email: "olivia@harbourdigital.au",
        phone: "+61 4 9876 5432",
        company: "Harbour Digital",
        title: "Head of Product",
      },
      {
        name: "Mateusz Wisniewski",
        email: "mateusz@gdanskcloud.pl",
        phone: "+48 512 345 678",
        company: "Gdansk Cloud",
        title: "Founder",
      },
      {
        name: "Chidi Okonkwo",
        email: "chidi@abujainnovate.ng",
        phone: "+234 803 456 7890",
        company: "Abuja Innovate",
        title: "CTO",
      },
      {
        name: "Laura Dubois",
        email: "laura@lyonstudio.fr",
        phone: "+33 6 12 34 56 78",
        company: "Lyon Studio",
        title: "Creative Director",
      },
      {
        name: "Hiroshi Tanaka",
        email: "hiroshi@osakabuild.jp",
        phone: "+81 80 2345 6789",
        company: "Osaka Build",
        title: "Engineering Lead",
      },
      {
        name: "Zainab Malik",
        email: "zainab@karachihub.pk",
        phone: "+92 300 1234567",
        company: "Karachi Hub",
        title: "Founder",
      },
    ];

    const contacts = await Contact.insertMany(
      contactSeeds.map((contact, i) => ({
        ...contact,
        owner: ownerFor(i),
        tags: i % 3 === 0 ? ["priority"] : [],
        favorite: i % 5 === 0,
      }))
    );

    console.log(`Seeded ${contacts.length} contacts`);

    // ── Leads ───────────────────────────────────────────────────────────

    const leadStatuses = [
      "New",
      "Qualified",
      "Proposal",
      "Won",
      "Lost",
    ];

    const leadPriorities = [
      "Low",
      "Medium",
      "High",
    ];

    const leadSources = [
      "Website",
      "Referral",
      "Cold Outreach",
      "Social",
      "Event",
      "Other",
    ];

    const leadValues = [
      4200,
      8500,
      12000,
      15600,
      19800,
      24000,
      27500,
      31000,
      9800,
      17250,
      22400,
      6300,
    ];

    const currentYear = new Date().getFullYear();

    const leadData = [];

    // Generate a random number of leads for every month.
    // Each month gets between 5 and 20 leads.

    for (let month = 0; month < 12; month++) {
      const leadsThisMonth = randomInt(5, 20);

      for (let i = 0; i < leadsThisMonth; i++) {
        const contact = randomItem(contacts);

        const createdAt = new Date(
          currentYear,
          month,
          randomInt(1, 28),
          randomInt(9, 17),
          randomInt(0, 59),
          randomInt(0, 59)
        );

        leadData.push({
          owner: ownerFor(
            randomInt(0, users.length - 1)
          ),

          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,

          status: randomItem(leadStatuses),
          priority: randomItem(leadPriorities),
          source: randomItem(leadSources),
          value: randomItem(leadValues),

          notes: "",

          tags:
            Math.random() < 0.3
              ? ["hot"]
              : [],

          order: leadData.length,

          createdAt,
          updatedAt: createdAt,
        });
      }
    }

    const leads = await Lead.insertMany(leadData);

    await Lead.bulkWrite(
      leads.map((lead, i) => ({
        updateOne: {
          filter: {
            _id: lead._id,
          },
          update: {
            $set: {
              createdAt: leadData[i].createdAt,
              updatedAt: leadData[i].createdAt,
            },
          },
        },
      }))
    );

    console.log(
      `Seeded ${leads.length} leads across all 12 months of ${currentYear}`
    );

    // ── Tasks ───────────────────────────────────────────────────────────

    const taskStatuses = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    const taskPriorities = [
      "Low",
      "Medium",
      "High",
    ];

    const taskTitles = [
      "Follow up on proposal",
      "Send pricing sheet",
      "Schedule demo call",
      "Check in after trial",
      "Confirm contract terms",
      "Prepare renewal quote",
      "Share onboarding docs",
      "Book kickoff meeting",
    ];

    const taskDrafts = [];

    leads.forEach((lead, i) => {
      const baseDate = new Date(
        leadData[i].createdAt
      );

      const taskCount = i % 3 === 0 ? 2 : 1;

      for (let t = 0; t < taskCount; t++) {
        const status =
          taskStatuses[
            (i + t) % taskStatuses.length
          ];

        const dueDate = new Date(
          baseDate.getTime() +
            (7 + t * 10) * 86400000
        );

        const contact = randomItem(contacts);

        taskDrafts.push({
          owner: ownerFor(i),

          title:
            taskTitles[
              (i + t) % taskTitles.length
            ],

          description: "",

          dueDate,

          status,

          priority:
            taskPriorities[
              (i + t) % taskPriorities.length
            ],

          relatedLead: lead._id,

          relatedContact: contact._id,

          completedAt:
            status === "Completed"
              ? dueDate
              : null,
        });
      }
    });

    const tasks = await Task.insertMany(
      taskDrafts
    );

    console.log(`Seeded ${tasks.length} tasks`);

    // ── Notes ───────────────────────────────────────────────────────────

    const noteBodies = [
      "Client is interested but wants a discount on annual billing.",
      "Had a great first call, decision maker is the CTO.",
      "Waiting on legal review before signing.",
      "Requested a custom onboarding session.",
      "Budget approved for next quarter.",
      "Asked for a comparison against a competitor.",
      "Wants a shorter contract term to start.",
      "Very responsive, quick to reply on email.",
    ];

    const notes = await Note.insertMany(
      leads.map((lead, i) => {
        const contact = randomItem(contacts);

        return {
          owner: ownerFor(i),

          content:
            noteBodies[
              i % noteBodies.length
            ],

          lead: lead._id,

          contact: contact._id,

          pinned: i % 8 === 0,
        };
      })
    );

    console.log(`Seeded ${notes.length} notes`);

    // ── Complete ─────────────────────────────────────────────────────────

    console.log("✅ Seeding complete");

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);

    await mongoose.disconnect();

    process.exit(1);
  }
}

seed();
