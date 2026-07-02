export type ReviewType = "Hostel" | "Restaurant";
export type Gender = "male" | "female";

export interface Review {
  id: number;
  name: string;
  type: ReviewType;
  rating: number;
  text: string;
  date: string; // ISO
  title?: string;
  gender?: Gender;
}

// ---------- Boys Hostel reviews (15 male students) ----------
const hostelReviews: Omit<Review, "id" | "type" | "gender">[] = [
  { name: "Rahul Reddy", rating: 5, text: "Staying at P.S.V Towers Boys Hostel feels like home. Rooms are spacious, food is homely and the security is top-notch. My parents are completely at peace.", date: "2026-06-15" },
  { name: "Sai Teja Kondapalli", rating: 5, text: "Best boys hostel in Vijayawada for engineering students. Wardens are caring, rooms are clean and Wi-Fi never lets me down during online classes.", date: "2026-06-12" },
  { name: "Karthik Varma", rating: 5, text: "24/7 CCTV and controlled entry made my parents finally relax about my stay in the city. Safe and well managed hostel.", date: "2026-06-08" },
  { name: "Praveen Naidu", rating: 5, text: "Laundry, housekeeping and tasty food — everything sorted. I can fully focus on my coaching classes without any distraction.", date: "2026-06-02" },
  { name: "Vamsi Krishna", rating: 5, text: "The 3-sharing AC room is super comfortable. Power backup and RO water are huge pluses during Vijayawada summers.", date: "2026-05-28" },
  { name: "Ajay Kumar", rating: 5, text: "Location is perfect — close to colleges, bus stops and shopping. Saves so much travel time every single day.", date: "2026-05-22" },
  { name: "Harsha Vardhan", rating: 5, text: "Love the rooftop space for evening chats. Small things like this make the hostel feel like a second home.", date: "2026-05-18" },
  { name: "Naveen Chowdary", rating: 5, text: "Clean washrooms, regular pest control and weekly room cleaning — they really maintain hygiene at a premium level.", date: "2026-05-12" },
  { name: "Sandeep Rao", rating: 5, text: "Owner uncle treats us like his own sons. Festivals are celebrated together — it truly feels like a family here.", date: "2026-05-05" },
  { name: "Rohit Sharma", rating: 5, text: "Special mention to the breakfast — a different tiffin every morning and always fresh, hot and tasty.", date: "2026-04-28" },
  { name: "Arjun Krishna", rating: 5, text: "Admission process was smooth and transparent with no hidden charges. Everything explained clearly on day one.", date: "2026-04-20" },
  { name: "Vikram Sai", rating: 5, text: "Three years here and never once felt away from home. The homemade meals are the real highlight of this place.", date: "2026-04-12" },
  { name: "Manoj Teja", rating: 5, text: "The study room is quiet and well lit. Group study sessions before exams have become so much easier.", date: "2026-04-05" },
  { name: "Bharath Rao", rating: 4, text: "Affordable fees for the kind of facilities provided. A small in-house gym would make it a perfect 5-star experience.", date: "2026-03-28" },
  { name: "Yashwanth Sharma", rating: 5, text: "Switched from another hostel and the difference is night and day. P.S.V is genuinely in a different league.", date: "2026-03-20" },
];

// ---------- Restaurant reviews (15 mixed Indian customers) ----------
const restaurantReviews: Omit<Review, "id" | "type">[] = [
  { name: "Ravi Teja", gender: "male", rating: 5, text: "Chicken biryani here is hands-down the best in Governorpet. Perfectly spiced, aromatic and never dry.", date: "2026-06-18" },
  { name: "Naga Lakshmi", gender: "female", rating: 5, text: "The breakfast tiffins — idli, dosa, upma — taste exactly like home. Very reasonable pricing too.", date: "2026-06-14" },
  { name: "Krishna Murthy", gender: "male", rating: 5, text: "Andhra meals plate is full value for money. Generous quantity, authentic taste and served hot every time.", date: "2026-06-10" },
  { name: "Anjali Devi", gender: "female", rating: 5, text: "Veg thali is wholesome and clean. We are a vegetarian family and finally found a regular spot in Vijayawada.", date: "2026-06-05" },
  { name: "Mahesh Varma", gender: "male", rating: 5, text: "Tried the mutton biryani last Sunday — soft pieces, beautiful aroma. Coming back next week for sure!", date: "2026-05-30" },
  { name: "Sirisha Prasad", gender: "female", rating: 5, text: "Staff is polite and dining area is super clean. Took my kids and had a wonderful family time.", date: "2026-05-25" },
  { name: "Karthik Reddy", gender: "male", rating: 5, text: "Usually skip restaurant curd rice but theirs is genuinely refreshing. Perfect after a spicy Andhra meal.", date: "2026-05-18" },
  { name: "Madhavi Latha", gender: "female", rating: 5, text: "Masala dosa is crisp and the chutney variety is amazing. Their breakfast is a must-try for anyone new to the area.", date: "2026-05-12" },
  { name: "Raghu Ramaiah", gender: "male", rating: 5, text: "Family dinner here every weekend has become a tradition. Comfortable seating, great ambience, great food.", date: "2026-05-06" },
  { name: "Deepika Reddy", gender: "female", rating: 5, text: "Tasty veg fried rice and gobi manchurian. Indo-Chinese done exactly right — not too oily, well seasoned.", date: "2026-04-28" },
  { name: "Praveen Sai", gender: "male", rating: 5, text: "Ordered for a small office party of 20 — on time, well packed and everyone loved every dish.", date: "2026-04-20" },
  { name: "Harika Vutukuri", gender: "female", rating: 5, text: "Paneer butter masala is creamy without being heavy. Pairs perfectly with their soft butter naan.", date: "2026-04-12" },
  { name: "Farhan Ali", gender: "male", rating: 5, text: "Mutton biryani with raita is my weekly therapy. Consistent flavour every single visit — never disappoints.", date: "2026-04-05" },
  { name: "Kavitha Rao", gender: "female", rating: 5, text: "Polite waiters, clean tables and prompt water refill. Hospitality basics done perfectly here.", date: "2026-03-28" },
  { name: "Priya Sharma", gender: "female", rating: 4, text: "Service is excellent and food is delicious. Only a minor wait during Sunday lunch rush — completely understandable.", date: "2026-03-20" },
];

// Build canonical list
export const ALL_REVIEWS: Review[] = [
  ...hostelReviews.map((r, i) => ({ ...r, id: i + 1, type: "Hostel" as const, gender: "male" as const })),
  ...restaurantReviews.map((r, i) => ({ ...r, id: i + 500, type: "Restaurant" as const })),
];

// --- Gender detection from common Indian first names ---
const FEMALE_FIRST = new Set([
  "sravani","lakshmi","priya","priyanka","anusha","divya","meghana","pooja","harshita","keerthi","sahithi","bhavana","sneha","rithika","vaishnavi","nandini","manasa","tejaswini","ramya","aishwarya","sindhu","chaitanya","yamini","pravallika","bhargavi","sushma","lasya","mounika","charitha","akshara","indu","rakshitha","hema","soumya","janaki","nikitha","rohini","akhila","snigdha","vijaya","saanvi","tanvi","eshika","pranavi","riya","aparajita","sania","vasudha","krithika","maithili","pavithra","ananya","charvi","dakshita","esha","faiza","naga","anjali","sirisha","sumalatha","madhavi","deepika","lalitha","manjula","harika","sailaja","indira","saritha","aparna","vandana","swathi","ishita","sonia","komal","aarti","megha","shruti","kriti","trisha","reema","reshma","kavya","kavitha","geetha","sangeetha","madhuri","rashmi","shilpa","sita","gita","meera","neha","ritu","sunita","saraswati","durga","parvati","kamala","shanti","usha","rekha","asha","latha","sujatha","padma","vidya","radha","sree","devi",
]);
const MALE_FIRST = new Set([
  "ravi","suresh","krishna","mahesh","karthik","vinod","phaneendra","raghu","praveen","srinivas","yashwanth","rajesh","phani","gopinath","bhanu","murali","naresh","tarun","hari","sai","aditya","bharat","chandu","divakar","eshwar","farhan","ganesh","harish","jagadish","kalyan","lokesh","madhav","nithin","omkar","pranay","qadir","ramesh","surya","trinath","arjun","raj","kumar","kiran","ramana","venkat","ram","prasad","babu","reddy","vijay","ajay","sanjay","rohit","amit","sumit","rahul","manoj","anil","sunil","deepak","vinay","vivek","yash","akash","sandeep","kishore","gopi","balaji","manish","abhishek","naveen","mohan","murthy","varma","teja","rakesh","dinesh","imran","uday","vamsi","hemanth","vishnu","sathish","karan","mohit","sumanth","pavan","aakash","bharath","bhargav","nikhil","ashok","rohan",
]);

export function detectGender(name: string): Gender {
  const first = (name || "").toLowerCase().trim().split(/\s+/)[0].replace(/[^a-z]/g, "");
  if (MALE_FIRST.has(first)) return "male";
  if (FEMALE_FIRST.has(first)) return "female";
  if (/(?:priya|devi|sree|itha|ika|ini|latha)$/.test(first)) return "female";
  return "male";
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Curated randomuser.me portrait indices that tend to look South Asian.
// Fallback initials render if the image fails to load (see ReviewCard).
const MALE_INDIAN_IDS = [6, 8, 12, 26, 32, 34, 40, 46, 51, 55, 61, 68, 74, 82, 91, 95];
const FEMALE_INDIAN_IDS = [4, 9, 15, 20, 26, 33, 41, 47, 52, 58, 65, 71, 79, 85, 92];

export function avatarFor(name: string, gender?: Gender) {
  const g = gender ?? detectGender(name);
  const pool = g === "female" ? FEMALE_INDIAN_IDS : MALE_INDIAN_IDS;
  const idx = pool[hashString(name) % pool.length];
  return `https://randomuser.me/api/portraits/${g === "female" ? "women" : "men"}/${idx}.jpg`;
}

export const REVIEW_STATS = {
  average: 4.8,
  totalLabel: "500+",
};
