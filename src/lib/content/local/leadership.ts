import { entryOf } from "../identifiers";
import type { Leader, LeadershipProfile } from "../types";
import {
  anishaPandayJoshiPortrait,
  karunRegmiPortrait,
  nischalKhadkaPortrait,
  philipBadikarHilarioPortrait,
  pranilPandeyPortrait,
  rameshPrasadTiwariPortrait,
  rameshwarThapaPortrait,
  robinRanaPortrait,
  samjhanaPhuyalPortrait,
  soniJoshiPortrait,
  sureshRajGhimirePortrait,
  yogRajKandelSharmaPortrait,
} from "./images";

const board: readonly Leader[] = [
  {
    ...entryOf("leader-rameshwar-thapa"),
    name: "Capt. Rameshwar Thapa",
    title: "Chairperson",
    group: "board",
    brief:
      "Founder Chairman of Annapurna Ventures, an entrepreneurship platform of 30+ ventures across Nepal's economy. A first-generation entrepreneur and strategic investor with two decades of aviation leadership, he is Nepal's first MI-17 Commander for commercial operations and chairs Simrik Air, Annapurna Media Network, NAMI College, and NAMI International School.",
    bio: `Capt. Rameshwar Thapa is the Founder Chairman of Annapurna Ventures, an entrepreneurship platform comprising more than 30 ventures across multiple sectors of Nepal's economy. Over a career spanning more than two decades, he has established and nurtured institutions in aviation, media, hydropower, healthcare, education, manufacturing, trading and distribution, real estate, construction, hospitality, ropeway infrastructure, and strategic investment.

Under his guidance, Annapurna Ventures has evolved into a multi-sector business ecosystem employing more than 1,200 professionals and creating sustainable platforms for economic growth and institutional resilience. Capt. Thapa's professional journey is deeply rooted in aviation. With over two decades of operational experience and command leadership across fixed-wing and helicopter platforms, he combines aviation expertise, operational discipline, and strategic vision. He is recognized as Nepal's first MI-17 Commander for commercial operations, contributing to the advancement of helicopter aviation standards, safety practices, and operational excellence in Nepal.

He currently serves as Chairman of Simrik Air Pvt. Ltd., one of Nepal's leading helicopter operators, Executive Chairman and Principal Owner of Annapurna Media Network (publisher of Annapurna Post and operator of Radio Annapurna), Chairman of Annapurna Education Initiatives, Chairman of NAMI College, and Chairman of NAMI International School. He is also Past President of the Airlines Operators Association of Nepal and President of the Helicopter Society of Nepal.

Capt. Thapa holds Airline Transport Pilot Licenses from Nepal and the United States, as well as a Commercial Pilot License from the USSR. His distinguished service has been recognized by the Government of Nepal with numerous national decorations, including the Prabal Gorkha Dakshin Bahu (Fourth Class, 2003), Prakhyat Trishakti Patta (Fourth Class, 2005), Sukirtimaya Rastradeep (2021), Rastrasewa Padak (2002), and Nepal Police Medals.`,
    portrait: rameshwarThapaPortrait,
  },
  {
    ...entryOf("leader-suresh-ghimire"),
    name: "Mr. Suresh Raj Ghimire",
    title: "Director",
    group: "board",
    brief:
      "Engineering management professional with an MSc from Brunel University London, UK, and over two decades of international experience across manufacturing operations, trading, and technical consultancy.",
    bio: `Mr. Suresh Raj Ghimire is an accomplished engineering management professional and international business expert with over two decades of experience in manufacturing operations management, trading, and consultancy services. He currently serves as Director at Naaya Aayam Multi-Disciplinary Institute (NAMI), contributing to the institute's vision of delivering high-quality education that blends technical knowledge with managerial expertise.

Mr. Ghimire holds a Master's in Engineering Management (MSc) from Brunel University London, UK, specializing in Technical Management of Manufacturing Industries, and a Bachelor's in Electrical and Electronics Engineering from Karnataka University, India. His academic background and professional experience position him as a strategic leader in engineering operations, project management, and technical consultancy.

Professionally, he has led international trading and consulting ventures while offering specialized expertise in lean manufacturing, production optimization, and technical management. His career includes key leadership roles both in Nepal and abroad, such as founding and operating KRYSS International Pvt. Ltd., a prominent trading house dealing in IT-based equipment for security forces and high-tech consumer goods. In London, he worked with Three Star Consulting Inc., offering global consulting in lean manufacturing systems, and served as Assistant Manager for International Sales and Services at TSK Company Ltd (Toyota International Wing). He also consulted for Nepal Hydro and Electric Co. Ltd. and served as part-time faculty at the London College of Engineering and Management.

At NAMI, he applies his global expertise and entrepreneurial vision to strengthen academic programs, promote industry-oriented learning, and mentor future professionals in engineering and management disciplines.`,
    portrait: sureshRajGhimirePortrait,
  },
  {
    ...entryOf("leader-soni-joshi"),
    name: "Ms. Soni Joshi",
    title: "Director",
    group: "board",
    brief:
      "Development practitioner, educator, and gender rights advocate with extensive experience in social development, education, and international service with UN Women's organizations and Zonta International.",
    bio: `Ms. Soni Joshi is a development practitioner, educator, and gender rights advocate with extensive experience in social development, education, and project management. She holds a Master's degree in Rural Development and Gender Studies (M.Sc. R.D.G.S) from the South Asian Institute of Technology (SAIT) and a Post Graduate Diploma in Women's Studies from Padma Kanya College, Tribhuvan University. Over the years, she has built her career around supporting women's empowerment and improving opportunities for marginalized communities in Nepal.

Throughout her professional journey, Ms. Joshi has worked in research, project development, communication, and training programs with organizations such as Friedrich Ebert Stiftung (FES), Inter Press Service (IPS), and the International Geographical Union (IGU). She has served as President of CHETANA (Centre for Health, Education, Training & National Advocacy). Her international involvement includes serving as the former Chair for Social Welfare, Environment Member, and Editorial Board Member of The Mirror Magazine under the United Nations Women's Organization (UNWO).

She has also led the Association of St. Mary's Alumni (ASMAN) as President. She is a Founder Member of Zonta Club Kathmandu under Zonta International, having served as Chair of Advocacy, Leadership, Service, and UN committees; she currently serves as District Chair of the UN Committee covering Nepal, India, Bangladesh, and Sri Lanka. Ms. Joshi is also Country Patron for the World Women Leadership Congress, where she was honored with the Women Leadership Achievement Award (2015) and Women Super Achiever Award (2017).

At NAMI, she plays an active role in institutional planning, supporting students, improving academic programs, and creating awareness about social responsibility.`,
    portrait: soniJoshiPortrait,
  },
  {
    ...entryOf("leader-yog-raj-kandel"),
    name: "Mr. Yog Raj Kandel Sharma",
    title: "Director",
    group: "board",
    brief:
      "Aviation and business management professional with over two decades bridging corporate governance, aviation operations, and community development. Holds an MBA Executive and an FAA Aircraft Dispatcher license.",
    bio: `Mr. Yog Raj Kandel Sharma brings to Naaya Aayam Multi-Disciplinary Institute (NAMI) a wealth of leadership experience spanning aviation management, corporate governance, and community development. Holding an MBA Executive from Purbanchal University and an Aircraft Dispatcher certification from the Federal Aviation Administration (FAA, USA), Mr. Sharma's expertise bridges business management and technical aviation operations.

His extensive leadership in Nepal's aviation sector includes senior roles at Simrik Air Pvt. Ltd., a leading helicopter service provider, where he managed operations, administration, and business development over 15 years. Beyond aviation, Mr. Sharma has held significant directorships and advisory memberships at prominent organizations such as Simrik Air Pvt. Ltd., KRYSS International Pvt. Ltd., and Manakamana Development Bank Ltd. His entrepreneurial vision is also demonstrated through promotion of renewable energy projects like the Aankhu Khola Jalbidhyut Company Ltd.

Deeply committed to social development, Mr. Sharma has played vital roles in numerous social, cultural, and community organizations, including bilateral bodies like the Nepal German Friendship Association. During his tenure as Managing Director, Mr. Sharma led NAMI through a period of exponential growth, establishing core operational frameworks and academic delivery systems that continue to support the institute today.`,
    portrait: yogRajKandelSharmaPortrait,
  },
  {
    ...entryOf("leader-robin-rana"),
    name: "Mr. Robin Rana",
    title: "Director",
    group: "board",
    brief:
      "Strategic advisor and business leader with over three decades across banking, aviation, telecommunications, energy, carbon markets, and environmental sustainability in Nepal.",
    bio: `Mr. Robin Rana is an experienced business leader and strategic advisor with over three decades of professional experience across banking, aviation, telecommunications, energy, consultancy, and environmental sustainability sectors in Nepal. Throughout his career, Mr. Rana has contributed to the growth and transformation of numerous organizations by providing strategic oversight, establishing corporate governance, building partnerships, and identifying growth opportunities.

Currently, Mr. Rana serves as the Director of Himalayan Carbon, where he provides strategic leadership in advancing initiatives related to carbon markets, renewable energy investments, carbon trading, and corporate sustainability commitments, contributing towards Nepal's transition to a low-carbon economy. Through Hansa International, he provides management consulting and strategic advisory services to national and international clients in business expansion and corporate strategy.

Mr. Rana has deep operational and commercial experience from Nepal's aviation and travel industry, having served as the General Sales Agent (GSA) for Jet Airways in Nepal. Prior to his entrepreneurial roles, Mr. Rana served as Executive Manager at Himalayan Bank Limited, where he established and managed the Credit Card Centre for Visa and Mastercard services, playing a foundational role in the development of Nepal's digital payment ecosystem.

Mr. Rana holds a Bachelor of Business Administration (BBA) in Finance from the State University of New York at Albany, USA. Beyond business, he has achieved distinction in athletics as a National Swimming Silver Medalist and National Shooting Silver Medalist (Veteran Category), and is an avid golfer.`,
    portrait: robinRanaPortrait,
  },
  {
    ...entryOf("leader-samjhana-phuyal"),
    name: "Ms. Samjhana Phuyal",
    title: "Director",
    group: "board",
    brief:
      "Human rights advocate, legal professional, and social development leader with two decades in gender equality, public safety, and women's rights. Holds an LLB and Master's in Anthropology.",
    bio: `Ms. Samjhana Phuyal is a Nepalese human rights advocate, legal professional, and social development leader with nearly two decades of experience in gender equality, women's rights, and community empowerment. She holds a Master's degree in Anthropology, a Postgraduate Diploma in Women's Studies, and an LLB from Tribhuvan University.

She is widely recognized for advancing women's rights and public safety initiatives in Nepal. In collaboration with Safe City India, she helped launch the Pink Bus Project, aimed at addressing sexual harassment in public transportation. She is also the founder of SEEW (Social Education and Empowerment of Women), which supports survivors of domestic violence and promotes gender equality. Through her work with the Safe Motherhood Network Federation (SMNF), she contributed to integrating Respectful Maternity Care (RMC) into Nepal's maternal health framework.

Ms. Phuyal represented Nepal at the United Nations General Assembly (UNGA 2012) as a Youth Leader for Maternal Health and has engaged with international platforms including Vital Voices, the White Ribbon Alliance, the World Forestry Institute, and Bioneers. Her advocacy has been featured on international platforms including The Guardian, and she has contributed testimony on child marriage to parliamentary discussions in the United Kingdom.

She is a recipient of the Tewa Excellent Fundraising Award (2009) and the Innovation & Entrepreneurship Prize (2015) awarded by the National Youth Entrepreneurship Forum in collaboration with the U.S. Embassy in Nepal. At NAMI, she contributes to institutional development, inclusive education, and youth mentorship.`,
    portrait: samjhanaPhuyalPortrait,
  },
  {
    ...entryOf("leader-ramesh-tiwari"),
    name: "Mr. Ramesh Prasad Tiwari",
    title: "Director",
    group: "board",
    brief:
      "Distinguished entrepreneur, educationist, and governance professional with extensive experience in corporate governance, institutional development, and stakeholder engagement.",
    bio: `Mr. Ramesh Prasad Tiwari is a distinguished entrepreneur, educationist, and governance professional with extensive experience in business leadership, corporate governance, and institutional development. As a Board Member of NAMI, he contributes to the strategic governance and long-term vision of the institution, supporting its commitment to academic excellence, innovation, and sustainable growth.

Academically, Mr. Tiwari holds a Master's degree in Sociology and Political Science. This background provides him with deep insights into organizational behavior and societal dynamics, enabling him to contribute meaningfully to both the education sector and broader social development initiatives.

Mr. Tiwari serves as a Board Director of Stoxkarts Securities Limited and Kantipur Campus, where he provides strategic oversight in corporate governance, policy formulation, organizational development, and stakeholder engagement. As a Founder Member of Kantipur Academy, he has played a pivotal role in establishing and strengthening an institution dedicated to delivering quality education and holistic student development.

An accomplished businessman, Mr. Tiwari has successfully led diverse ventures with a focus on ethical governance, institutional excellence, and long-term value creation in Nepal.`,
    portrait: rameshPrasadTiwariPortrait,
  },
];

const management: readonly Leader[] = [
  {
    ...entryOf("leader-pranil-pandey"),
    name: "Mr. Pranil Pandey",
    title: "Chief Executive Officer",
    group: "management",
    brief:
      "Chief Executive Officer of NAMI, leading day-to-day operations and strategic delivery across its schools and college. Fellow Chartered Certified Accountant (FCCA, UK) and Master's in Management.",
    bio: `Mr. Pranil Pandey, FCCA, serves as the Chief Executive Officer of NAMI, where he has played a central role in shaping the institution's vision and growth since joining in 2015. As CEO, he leads day-to-day operations and strategic execution across NAMI International School and NAMI College.

Before his tenure at NAMI, Mr. Pandey established a solid foundation in financial accounting, auditing, and corporate governance through his work in professional accounting practice and corporate advisory. As a Fellow Chartered Certified Accountant (FCCA, UK), his background in financial stewardship and organizational management has been instrumental in strengthening governance, establishing modern operational systems, and enhancing efficiency at NAMI.

At NAMI, Mr. Pandey leads key strategic initiatives, including institutional accreditation, curriculum development, international university collaborations with the University of Northampton UK, and infrastructure modernisation. He actively promotes student leadership development, interdisciplinary learning, and industry partnerships to produce globally competent and career-ready graduates.

Mr. Pandey holds a Master's degree in Management, a Bachelor of Business Administration (BBA) from IEC University, and completed his GCE A and O Levels under the University of Cambridge curriculum.`,
    portrait: pranilPandeyPortrait,
  },
  {
    ...entryOf("leader-karun-regmi"),
    name: "Mr. Karun Regmi",
    title: "Head, Business Development And Marketing & Branding",
    group: "management",
    brief:
      "Head of Business Development and Marketing & Branding at NAMI, bringing multidisciplinary expertise in marketing strategy, brand communications, banking operations, and media content development. Holds an MBS from Tribhuvan University.",
    bio: `Mr. Karun Regmi is an experienced professional currently serving as the Head of Marketing and Branding at Naaya Aayam Multi-Disciplinary Institute (NAMI). He has professional experience spanning marketing and branding, communication, content development, banking, credit management, branch operations and customer relations. Mr. Regmi holds strong leadership, communication, analytical and problem-solving skills.

At NAMI, Mr. Regmi is responsible for supporting the institution's marketing, branding, communication and promotional activities. His role involves contributing to institutional visibility, policy making, developing communication and promotional content, coordinating marketing initiatives and supporting the organization's overall branding and outreach efforts.

Prior to joining NAMI, he gained extensive experience in the banking and financial services sector. He worked as an Assistant at Muktinath Bikas Bank Ltd. for two years, handling retail and SME credit-related activities, credit file preparation and legal documentation reporting. He subsequently worked as an Assistant at Garima Bikas Bank Ltd. for two years, where he was involved in retail and SME credit functions, documentation, customer service and credit file management.

He also worked for two years at Kamana Sewa Bikas Bank Ltd. as a Branch Manager/Supervisor, where he was responsible for branch operations, deposit-related activities, customer service, staff coordination and communication with the Head Office.

In the field of communication and media, Karun worked as a Content Writing Expert at Shilalekha Multimedia Pvt. Ltd., Banke and Montage Media Pvt. Ltd., Surkhet, gaining experience in content development and communication. He also served as an Officer/Content Writing Expert at the Trade and Export Promotion Centre, Pulchowk, Lalitpur, where he was involved in content development, communication, documentation and information dissemination.

Mr. Regmi holds a Master of Business Studies (MBS) from Baneshwor Multiple Campus, Tribhuvan University. He has completed professional training in Advanced Office Package, General Banking Knowledge and Basic Credit Management. He possesses practical skills in MS Office, communication, content development, documentation, marketing coordination and stakeholder engagement.

Mr. Regmi has strong leadership, communication, interpersonal, coordination and organizational skills. His diverse professional background in marketing, banking, communication and media enables him to bring a practical and multidisciplinary approach to institutional branding, stakeholder engagement and organizational development at NAMI.`,
    portrait: karunRegmiPortrait,
  },
];

const academics: readonly Leader[] = [
  {
    ...entryOf("leader-nischal-khadka"),
    name: "Mr. Nischal Khadka",
    title: "Academic Head, NAMI",
    group: "academics",
    brief:
      "Academic Head at NAMI and NILE Champion. Dual Gold Medalist in BCA and MCA from Sikkim Manipal University, full-stack software engineer, and IT consultant in .NET Core, Angular, and microservices.",
    bio: `Mr. Nischal Khadka is a distinguished academician and IT professional currently serving as the Academic Head at Naaya Aayam Multi-Disciplinary Institute (NAMI). A dual Gold Medalist in both Bachelor and Master of Computer Applications from Sikkim Manipal University, he has demonstrated consistent academic excellence and a passion for advancing technology-driven education.

Mr. Khadka brings a strong combination of academic leadership, software development expertise, and IT consultancy experience. His career at NAMI has evolved from lecturing to key leadership roles including Module Leader, Assistant Program Leader, Program Leader, and now Academic Head. As the NILE (Northampton Integrated Learning Environment) Champion, he spearheads digital learning initiatives and leads academic quality assurance, ensuring teaching practices meet UK university standards.

In parallel with his academic leadership, Mr. Khadka practices as a full-stack developer and IT consultant specializing in .NET Core, Angular, microservice architecture, and ISO 27001 security standards. His active engagement in industry software projects allows him to bridge classroom theory with contemporary engineering practices, inspiring students to build real-world software solutions.`,
    portrait: nischalKhadkaPortrait,
  },
  {
    ...entryOf("leader-anisha-joshi"),
    name: "Ms. Anisha Panday Joshi",
    title: "Principal, NAMI International School",
    group: "academics",
    brief:
      "Principal of NAMI International School with 15+ years in education leadership, curriculum design, and student wellbeing. Master's in Education (NOCN, UK) and MBA from Kathmandu University.",
    bio: `Ms. Anisha Panday Joshi is the Principal of NAMI International School with over 15 years of experience in education leadership, administration, and pedagogical innovation. Holding a Master's in Education from the National Open College Network (NOCN, UK) and an MBA in Marketing from Kathmandu University, she combines deep educational expertise with strategic school management skills.

Her career includes leadership in curriculum development, teacher training, school operations, and student wellbeing. Prior to joining NAMI, Ms. Panday served as Secondary School Coordinator and English Language Teacher at Sanskriti International School and worked as an educational consultant at Shushrusha Serves.

Passionate about using education to empower individuals and foster societal progress, Ms. Panday focuses on developing compassionate, responsible, and globally minded citizens alongside academic success. At NAMI International School, she leads with vision, integrity, and purpose, ensuring students and faculty receive the support, resources, and inspiration needed to excel.`,
    portrait: anishaPandayJoshiPortrait,
  },
  {
    ...entryOf("leader-philip-hilario"),
    name: "Mr. Philip Badikar Hilario",
    title: "A Level Principal, NAMI College",
    group: "academics",
    brief:
      "A Level Principal at NAMI College with 21+ years in business and accounting education. Leads academic coordination, Cambridge CAIE curriculum implementation, and student development.",
    bio: `Mr. Philip Badikar Hilario is an experienced educator and academic administrator with over 21 years of expertise in business and accounting education. As A Level Principal at NAMI College, he leads academic coordination, Cambridge Assessment International Education (CAIE) curriculum delivery, and student mentoring, fostering a rigorous culture of academic excellence.

Mr. Hilario has taught Business and Accounting at A Level across several reputed institutions in Nepal, consistently demonstrating strong instructional leadership, subject mastery, and a passion for student-centred pedagogy. He is an author of educational reference texts including Business Calculations, and is currently pursuing his ACCA (UK) qualification.

His leadership combines data-driven academic monitoring with evidence-based decision-making, ensuring that NAMI College students achieve outstanding Cambridge examination results and gain admission to top universities worldwide.`,
    portrait: philipBadikarHilarioPortrait,
  },
];

export const leadership: LeadershipProfile = { board, management, academics };
