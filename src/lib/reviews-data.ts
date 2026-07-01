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

// ---------- Boys Hostel reviews (male students only) ----------
const hostelReviews: Omit<Review, "id" | "type" | "gender">[] = [
  { name: "Rahul Reddy", rating: 5, text: "Staying at P.S.V Towers Boys Hostel feels like home. Rooms are spacious, food is homely and the security is top-notch. My parents are completely at peace.", date: "2026-06-15" },
  { name: "Arjun Krishna", rating: 5, text: "Best boys hostel in Vijayawada for engineering students. Wardens are caring, rooms are clean and Wi-Fi never lets me down during online classes.", date: "2026-06-12" },
  { name: "Vikram Sai", rating: 5, text: "Three years and never once felt away from home. The homemade meals are the highlight. Highly recommended for hostel life.", date: "2026-06-10" },
  { name: "Karthik Varma", rating: 5, text: "24/7 CCTV and controlled entry made my parents finally relax about my stay in the city. Safe and well managed.", date: "2026-06-08" },
  { name: "Suresh Kumar", rating: 5, text: "The 3-sharing AC room is super comfortable. Power backup and RO water are huge pluses during Vijayawada summers.", date: "2026-06-05" },
  { name: "Praveen Naidu", rating: 5, text: "Laundry, housekeeping and tasty food — everything sorted. I can fully focus on my coaching classes.", date: "2026-06-02" },
  { name: "Manoj Teja", rating: 5, text: "The study room is quiet and well lit. Group studies before exams have become so much easier.", date: "2026-05-30" },
  { name: "Bharath Rao", rating: 5, text: "Owner uncle treats us like his own sons. Festivals are celebrated together — it really feels like a family.", date: "2026-05-28" },
  { name: "Yashwanth Sharma", rating: 5, text: "Affordable fees for the kind of facilities provided. Nothing else comes close in Governorpet.", date: "2026-05-25" },
  { name: "Rohan Iyer", rating: 5, text: "Special mention to the breakfast — different tiffin every morning and always fresh.", date: "2026-05-22" },
  { name: "Sandeep Chowdary", rating: 5, text: "Moved in last month and already feel settled. The other boys are friendly and staff is very responsive.", date: "2026-05-20" },
  { name: "Naveen Kumar", rating: 5, text: "Clean washrooms, regular pest control and weekly room cleaning — they really maintain hygiene.", date: "2026-05-18" },
  { name: "Ajay Reddy", rating: 5, text: "Location is perfect — close to colleges, bus stops and shopping. Saves so much travel time.", date: "2026-05-15" },
  { name: "Kiran Patil", rating: 5, text: "I was nervous moving from a small town to Vijayawada. P.S.V Towers made the transition smooth and safe.", date: "2026-05-12" },
  { name: "Harish Yadav", rating: 5, text: "Love the rooftop space for evening chats and cricket talks. Small things like this make the hostel special.", date: "2026-05-10" },
  { name: "Deepak Varma", rating: 5, text: "The food is balanced and never repetitive. Sunday non-veg special is something we all look forward to.", date: "2026-05-08" },
  { name: "Ramesh Babu", rating: 5, text: "Internet speed is genuinely good. Attended my entire online certification course without a glitch.", date: "2026-05-05" },
  { name: "Sai Kiran", rating: 5, text: "Visitor rules are strict in a good way. Felt very secure at all times.", date: "2026-05-02" },
  { name: "Vinod Kumar", rating: 5, text: "Stayed here during my internship and the experience was wonderful. Will recommend to my juniors.", date: "2026-04-28" },
  { name: "Chaitanya Rao", rating: 5, text: "Admission process was smooth and transparent. No hidden charges at all.", date: "2026-04-25" },
  { name: "Mahesh Varma", rating: 5, text: "First time away from home and I genuinely feel cared for. Uncle makes the best chicken curry on Sundays!", date: "2026-04-22" },
  { name: "Aditya Sai", rating: 5, text: "AC works perfectly, beds are comfortable and storage space is generous. Worth every rupee.", date: "2026-04-20" },
  { name: "Rakesh Reddy", rating: 5, text: "Medical response when I was down with fever was incredible. They took me to a clinic immediately.", date: "2026-04-18" },
  { name: "Anil Kumar", rating: 5, text: "Best part — the silence after 10 PM. Perfect for late-night study sessions.", date: "2026-04-15" },
  { name: "Nikhil Reddy", rating: 5, text: "Festive food and decorations during Sankranti were beautiful. Felt at home even miles away from family.", date: "2026-04-12" },
  { name: "Krishna Mohan", rating: 4, text: "Owners are very approachable. Any small issue gets resolved the same day. A small gym would make it 5-star.", date: "2026-04-10" },
  { name: "Prasad Kondapalli", rating: 5, text: "Roommates have become my best friends. The hostel culture is genuinely warm.", date: "2026-04-08" },
  { name: "Ashok Nair", rating: 5, text: "I am from Kerala and the food still feels familiar. They balance flavours beautifully.", date: "2026-04-05" },
  { name: "Ravi Teja", rating: 5, text: "Reasonable mess timings and they accommodate requests during exam season.", date: "2026-04-02" },
  { name: "Bhargav Reddy", rating: 5, text: "The terrace is a peaceful escape after a long college day. Loved my one year here.", date: "2026-03-30" },
  { name: "Sathish Kumar", rating: 5, text: "Drinking water quality, food quality, room hygiene — top class on every front.", date: "2026-03-28" },
  { name: "Karan Pillai", rating: 5, text: "Safety is non-negotiable for my parents and P.S.V Towers ticks every single box.", date: "2026-03-25" },
  { name: "Srinivas Rao", rating: 5, text: "Stayed for 2 years during MBA and never had a single major complaint. That itself says a lot.", date: "2026-03-22" },
  { name: "Mohit Yadav", rating: 5, text: "Smooth Wi-Fi, dedicated study desks and a charging point per bed — small things that matter.", date: "2026-03-20" },
  { name: "Tarun Vasa", rating: 5, text: "The food has variety — North Indian, Andhra meals and even Chinese on weekends.", date: "2026-03-18" },
  { name: "Sumanth Pasula", rating: 5, text: "Switched from another hostel and the difference is night and day. P.S.V is a different league altogether.", date: "2026-03-15" },
  { name: "Rajesh Naidu", rating: 4, text: "Everything is great. Only suggestion — allow slightly late entry on Fridays. Otherwise 5 stars.", date: "2026-03-12" },
  { name: "Vishnu Rao", rating: 5, text: "Affordable, safe and homely. My dad keeps recommending this place to other parents.", date: "2026-03-10" },
  { name: "Balaji Sundar", rating: 5, text: "Quiet neighbourhood, great morning light in the rooms and warm food. Perfect combination.", date: "2026-03-08" },
  { name: "Sanjay Cherukuri", rating: 5, text: "The controlled-entry system makes coming and going seamless and very secure. Loved the setup.", date: "2026-03-05" },
  { name: "Gopi Krishna", rating: 5, text: "Roommates of different backgrounds — I learnt so much beyond just academics here.", date: "2026-03-02" },
  { name: "Hemanth M.", rating: 4, text: "Wonderful place. Slightly busy reception in the evenings but staff handle it gracefully.", date: "2026-02-28" },
  { name: "Vamsi Kothapalli", rating: 5, text: "Very transparent rules. Curfew and visitor policies are clearly explained on day one.", date: "2026-02-25" },
  { name: "Abhishek Singh", rating: 5, text: "Came for an exam stint. They allowed short-term stay and still gave full hostel facilities.", date: "2026-02-22" },
  { name: "Dinesh Kumar", rating: 5, text: "Mess timing flexibility during exam weeks is a huge relief. Owners genuinely understand students.", date: "2026-02-20" },
  { name: "Imran Khan", rating: 5, text: "Food respects dietary preferences. Always a vegetarian option, always tasty.", date: "2026-02-18" },
  { name: "Uday Sai", rating: 5, text: "The festive Pongal celebration with all the boys was unforgettable. Will cherish it forever.", date: "2026-02-15" },
  { name: "Nithin Vemula", rating: 5, text: "Common room with a TV is a great unwind space. Sunday cricket match nights are the best.", date: "2026-02-12" },
  { name: "Aakash Joshi", rating: 5, text: "Weekly linen change. Such a small detail but it adds up to a premium experience.", date: "2026-02-10" },
  { name: "Pavan Rao", rating: 5, text: "Top floor rooms have a beautiful view of the city. Sunset chai sessions are unbeatable.", date: "2026-02-08" },
];

// ---------- Restaurant reviews (mixed Indian customers — men, women, families, students) ----------
const restaurantReviews: Omit<Review, "id" | "type">[] = [
  { name: "Ravi Teja", gender: "male", rating: 5, text: "Chicken biryani here is hands-down the best in Governorpet. Perfectly spiced and never dry.", date: "2026-06-18" },
  { name: "Naga Lakshmi", gender: "female", rating: 5, text: "The breakfast tiffins — idli, dosa, upma — taste exactly like home. Reasonable price too.", date: "2026-06-14" },
  { name: "Krishna Murthy", gender: "male", rating: 5, text: "Andhra meals plate is full value for money. Generous quantity and authentic taste.", date: "2026-06-11" },
  { name: "Anjali Devi", gender: "female", rating: 5, text: "Veg thali is wholesome and clean. We are a vegetarian family and finally found a regular spot.", date: "2026-06-09" },
  { name: "Mahesh Varma", gender: "male", rating: 5, text: "Tried the mutton biryani last Sunday — soft pieces, beautiful aroma. Coming back next week!", date: "2026-06-07" },
  { name: "Sirisha P.", gender: "female", rating: 5, text: "Staff is polite and dining area is super clean. Took my kids and had a great family time.", date: "2026-06-04" },
  { name: "Karthik Reddy", gender: "male", rating: 5, text: "Usually skip restaurant curd rice but theirs is genuinely refreshing. Perfect after a spicy meal.", date: "2026-06-01" },
  { name: "Vinod Kumar", gender: "male", rating: 5, text: "Affordable, tasty and consistent. Office lunch is sorted because of P.S.V.", date: "2026-05-29" },
  { name: "Sumalatha Rao", gender: "female", rating: 5, text: "Special mention for the gongura mutton — restaurant quality with home-style love.", date: "2026-05-27" },
  { name: "Phaneendra G.", gender: "male", rating: 5, text: "Quick service even during peak hours. They manage the crowd very well.", date: "2026-05-24" },
  { name: "Madhavi Latha", gender: "female", rating: 5, text: "Masala dosa is crisp and the chutney variety is amazing. A breakfast must-try.", date: "2026-05-21" },
  { name: "Raghu Ramaiah", gender: "male", rating: 5, text: "Family dinner here every weekend has become a tradition. Comfortable seating, great food.", date: "2026-05-19" },
  { name: "Praveen Sai", gender: "male", rating: 5, text: "Ordered for a small office party — 20 people, on time, well packed and everyone loved it.", date: "2026-05-16" },
  { name: "Deepika Reddy", gender: "female", rating: 5, text: "Tasty veg fried rice and gobi manchurian. Indo-Chinese done right.", date: "2026-05-13" },
  { name: "Srinivas Patnaik", gender: "male", rating: 5, text: "Filter coffee here is properly strong and aromatic. Reminds me of my hometown.", date: "2026-05-11" },
  { name: "Lalitha Sree", gender: "female", rating: 5, text: "Pricing is honest. No surprises on the bill and quantities are generous.", date: "2026-05-09" },
  { name: "Yashwanth K.", gender: "male", rating: 5, text: "The fish fry is unbelievably tender. Fresh ingredients clearly make the difference.", date: "2026-05-06" },
  { name: "Manjula Devi", gender: "female", rating: 5, text: "Hostel-resident discount makes weekly outings even more affordable. Thank you!", date: "2026-05-03" },
  { name: "Rajesh Annam", gender: "male", rating: 5, text: "Birthday dinner setup was lovely. They went out of their way to help us celebrate.", date: "2026-04-30" },
  { name: "Harika Vutukuri", gender: "female", rating: 5, text: "Paneer butter masala is creamy without being heavy. Pairs perfectly with butter naan.", date: "2026-04-27" },
  { name: "Phani Kumar", gender: "male", rating: 5, text: "Hot, fresh and served fast. Even a quick lunch break feels relaxed here.", date: "2026-04-24" },
  { name: "Sailaja N.", gender: "female", rating: 5, text: "Brought my parents from the village — they loved the food and the cleanliness.", date: "2026-04-21" },
  { name: "Gopinath R.", gender: "male", rating: 5, text: "Late-night parcel was packed with extra care. Truly customer-first attitude.", date: "2026-04-19" },
  { name: "Indira Devi", gender: "female", rating: 5, text: "Pulihora and pongal taste like festival food at home. Authentic flavours.", date: "2026-04-16" },
  { name: "Bhanu Prakash", gender: "male", rating: 5, text: "Chicken 65 is crispy outside, juicy inside — exactly how it should be.", date: "2026-04-13" },
  { name: "Saritha Mallela", gender: "female", rating: 5, text: "Tried their veg meals during a fasting day — light, satisfying and very clean.", date: "2026-04-11" },
  { name: "Murali Krishna", gender: "male", rating: 5, text: "Consistent quality for years. Not many restaurants in the area can claim this.", date: "2026-04-09" },
  { name: "Aparna Devi", gender: "female", rating: 5, text: "Loved the variety on the menu. There is something for everyone in the family.", date: "2026-04-06" },
  { name: "Naresh Babu", gender: "male", rating: 5, text: "Special biryani night was a brilliant idea. We go every other Friday now.", date: "2026-04-03" },
  { name: "Tarun Kumar", gender: "male", rating: 5, text: "Dining hall feels premium yet cosy. Great place to bring guests.", date: "2026-03-31" },
  { name: "Vandana Rao", gender: "female", rating: 5, text: "Sweets like kesari and gulab jamun are made fresh. Not dripping in sugar — perfectly balanced.", date: "2026-03-29" },
  { name: "Hari Babu", gender: "male", rating: 5, text: "Combo meals at lunch are unbeatable value. Full belly, light wallet.", date: "2026-03-26" },
  { name: "Swathi Patel", gender: "female", rating: 5, text: "Hyderabadi dum biryani is layered, fragrant and not too oily. Loved it!", date: "2026-03-23" },
  { name: "Sai Kiran", gender: "male", rating: 5, text: "Chicken curry with ragi sangati is a dream combo. Authentic Rayalaseema flavours.", date: "2026-03-21" },
  { name: "Aditya Varma", gender: "male", rating: 5, text: "Hyderabadi biryani done with Andhra love. Brinjal curry on the side is unreal.", date: "2026-03-19" },
  { name: "Priya Sharma", gender: "female", rating: 4, text: "Service is excellent. Only minor wait during Sunday lunch rush — completely expected.", date: "2026-03-16" },
  { name: "Chandu Mohan", gender: "male", rating: 5, text: "I am a chef myself and I appreciate the consistency in their masala. Big compliment.", date: "2026-03-13" },
  { name: "Divakar Rao", gender: "male", rating: 5, text: "Ordered family pack biryani — packed neatly, labelled on top, accurate count. Professional.", date: "2026-03-11" },
  { name: "Neha Reddy", gender: "female", rating: 5, text: "Sambar is something I judge every restaurant by, and theirs is excellent. Hot and aromatic.", date: "2026-03-09" },
  { name: "Farhan Ali", gender: "male", rating: 5, text: "Mutton biryani with raita is my weekly therapy. Never disappoints.", date: "2026-03-06" },
  { name: "Ganesh Pillai", gender: "male", rating: 5, text: "Pesarattu and upma combo was a delightful surprise. Reminded me of my grandmother's kitchen.", date: "2026-03-04" },
  { name: "Harish Babu", gender: "male", rating: 5, text: "Late dinner crowd is welcomed warmly. Felt valued as a customer.", date: "2026-03-01" },
  { name: "Ishita Reddy", gender: "female", rating: 5, text: "Vegetarian set meal with five curries is a steal at this price. Highly satisfying.", date: "2026-02-27" },
  { name: "Jagadish R.", gender: "male", rating: 5, text: "Tiffins from here power my entire morning. Office colleagues now order through me!", date: "2026-02-24" },
  { name: "Kalyan Reddy", gender: "male", rating: 5, text: "Karaikudi chicken is fiery and full of flavour. A must-try if you love heat.", date: "2026-02-21" },
  { name: "Lokesh Sai", gender: "male", rating: 4, text: "Loved the food. A small dessert variety expansion would make it perfect.", date: "2026-02-19" },
  { name: "Madhav Rao", gender: "male", rating: 5, text: "Lunch combo with sweet, curd and pickle — every plate feels complete and thoughtful.", date: "2026-02-16" },
  { name: "Nithin Babu", gender: "male", rating: 5, text: "Took a client here and he couldn't stop praising the biryani. Made me proud.", date: "2026-02-13" },
  { name: "Omkar Yadav", gender: "male", rating: 5, text: "Roti was hot and soft, dal makhani was rich. North Indian section is genuinely strong.", date: "2026-02-11" },
  { name: "Pranay Reddy", gender: "male", rating: 5, text: "Quick parcel turnaround. Walked in, ordered, picked up in 12 minutes. Brilliant.", date: "2026-02-09" },
  { name: "Sonia Khan", gender: "female", rating: 5, text: "Brought my grandparents and they appreciated the soft, mildly spiced options too.", date: "2026-02-06" },
  { name: "Ramesh Annam", gender: "male", rating: 5, text: "Special meal during Ugadi was incredible. Loved the festive touch.", date: "2026-02-03" },
  { name: "Surya Teja", gender: "male", rating: 5, text: "The egg biryani is severely underrated. Try it once — you will keep coming back.", date: "2026-01-31" },
  { name: "Kavitha Rao", gender: "female", rating: 5, text: "Polite waiters, clean tables, prompt water refill. Hospitality basics done perfectly.", date: "2026-01-29" },
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
