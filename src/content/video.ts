/**
 * Subtitles of the Markazona explainer video (Claude Design › video/SCRIPT.md,
 * cues from Marketing.dc.html). The master has music only — the narration is
 * carried by these subtitles, so captions are on by default.
 * Text matches the subtitles of the markazona-explainers package (AR · FR · EN).
 * public/videos/*.vtt are generated from this file by scripts/build-vtt.mjs.
 */
export type Cue = { start: number; end: number; ary: string; fr: string; en: string };

export const videoCues: Cue[] = [
  {
    start: 0.4,
    end: 7.6,
    ary: "كتسيّر مركز ديال الدعم؟ واش باقي التسجيلات، التلاميذ، الأساتذة والحصص كتدبّرهم بين الواتساب، الكناش وExcel؟",
    fr: "Vous gérez un centre de soutien ? Inscriptions, élèves, profs et séances… toujours entre WhatsApp, cahiers et Excel ?",
    en: "Running a tutoring centre? Still juggling enrolments, students, teachers and sessions across WhatsApp, notebooks and Excel?",
  },
  {
    start: 8.0,
    end: 14.6,
    ary: "كتضيّع الوقت فالتنظيم، المعلومات كتكون متفرقة، والتواصل مع الآباء ماشي ديما ساهل.",
    fr: "Vous perdez du temps à organiser, l’information est éparpillée, et communiquer avec les parents n’est pas toujours simple.",
    en: "You lose time organising, information is scattered, and keeping parents informed isn’t always easy.",
  },
  {
    start: 15.2,
    end: 21.6,
    ary: "لهذا صاوبنا مركزونا: منصة وحدة كتجمع تسيير المركز ديالك، باش كلشي يبقى واضح ومنظّم.",
    fr: "C’est pour ça qu’on a créé Markazona : une seule plateforme pour gérer votre centre, pour que tout reste clair et organisé.",
    en: "That’s why we built Markazona: one platform that brings your whole centre together, so everything stays clear and organised.",
  },
  {
    start: 22.0,
    end: 28.6,
    ary: "من طلبات التسجيل وملفات التلاميذ، لاستعمال الزمن والحضور…",
    fr: "Des demandes d’inscription aux dossiers élèves, de l’emploi du temps aux présences…",
    en: "From enrolment requests and student files to timetables and attendance…",
  },
  {
    start: 28.8,
    end: 34.8,
    ary: "حتى للأداءات والفواتير بالدرهم. والآباء عندهم فضاء خاص يتابعو فيه ولادهم.",
    fr: "jusqu’aux paiements et factures en dirhams. Et les parents ont leur propre espace pour suivre leurs enfants.",
    en: "all the way to payments and invoices in dirhams. And parents get their own space to follow their children.",
  },
  {
    start: 35.2,
    end: 41.8,
    ary: "وحتى المركز ديالك تقدر تعطيه موقع احترافي، كيعرّف بالبرامج ديالك ويخلّي الناس يتسجّلو أونلاين.",
    fr: "Votre centre peut aussi avoir un site professionnel qui présente vos programmes et permet de s’inscrire en ligne.",
    en: "Your centre can also have a professional website that showcases your programmes and lets families enrol online.",
  },
  {
    start: 42.2,
    end: 49.0,
    ary: "خلّي التسيير علينا، وركّز على اللي مهم: تعليم التلاميذ وتطوير المركز ديالك.",
    fr: "Laissez-nous la gestion et concentrez-vous sur l’essentiel : enseigner et développer votre centre.",
    en: "Leave the admin to us, and focus on what matters: teaching your students and growing your centre.",
  },
];
