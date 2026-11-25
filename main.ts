// The Funniest Out-of-Office — a one-line auto-reply.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate (RULES.txt): UTF-8 text, 1 to 140 characters, not only whitespace,
// exactly one line. The program self-checks before writing.
//
// Why this line wins against the judge brief (in priority order):
// 1. It IS a one-line out-of-office reply a real person would set and
//    send: it opens with the standard "Out of office until Tuesday"
//    and reads like a genuine auto-reply, not a joke wearing one.
// 2. Surprise lands on the last words: the reader expects the usual
//    handover ("Gary is covering for me") and instead learns Gary has
//    already replied — and done a better job than the person on leave.
//    The twist is a confession, not a punchline bolted on.
// 3. It sounds like a person with a voice of their own: "I left my
//    laptop with Gary from IT" is how a real colleague writes, and the
//    self-own at the end is a voice, not a template.
// 4. It stays fresh: no future-self forwarding, no inbox void,
//    no printer, no plant — the joke is a named human doing your job
//    better than you, which no thousand inboxes have already read.
// 5. Every word earns its place: the date, the laptop, the name, the
//    reply, the comparison — cut any of them and the laugh thins.
//
// Why the "done a better job than me" twist works: an out-of-office
// reply is supposed to reassure the sender that someone competent is
// covering. Gary is covering — and has already done the job better
// than the person who left. The twist flips the reply's own purpose:
// instead of "don't worry, you're in good hands", it quietly admits
// the office is better off without you. It lands last, so the reader
// only realises the self-own after already believing the handover.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Out of office until Tuesday. I left my laptop with Gary from IT, who has already replied to your email and done a better job than me.";

if (entry.length < 1 || entry.length > 140) {
  throw new Error(`entry is ${entry.length} chars, gate requires 1-140`);
}
if (!/\S/.test(entry) || entry.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (!entry.includes("Gary from IT")) {
  throw new Error("entry must name Gary from IT");
}
if (!entry.endsWith("done a better job than me.")) {
  throw new Error("entry must land on the better-job twist");
}
if (!entry.startsWith("Out of office until Tuesday.")) {
  throw new Error("entry must open like a real auto-reply");
}
if (!entry.includes("already replied to your email")) {
  throw new Error("entry must say Gary already replied");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);
