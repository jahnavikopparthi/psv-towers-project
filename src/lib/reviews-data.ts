export type ReviewType = "Hostel" | "Restaurant";

export interface Review {
  id: number;
  name: string;
  type: ReviewType;
  rating: number;
  text: string;
  date: string; // ISO
}

const hostelReviews: Omit<Review, "id" | "type">[] = [
  { name: "Sravani Reddy", rating: 5, text: "Staying at P.S.V Towers feels like home. The rooms are spacious, food is homely, and the security is top-notch. My parents are completely at peace.", date: "2026-06-15" },
  { name: "Lakshmi Priya", rating: 5, text: "Best girls hostel in Vijayawada. The wardens are caring, rooms are clean and the WiFi never lets me down during my online classes.", date: "2026-06-12" },
  { name: "Anusha K.", rating: 5, text: "I love the homemade meals here. Three years and never once felt I was away from home. Highly recommended for working women too.", date: "2026-06-10" },
  { name: "Divya Sree", rating: 5, text: "24/7 CCTV and biometric entry made my parents finally relax about my stay in the city. Truly safe and well managed.", date: "2026-06-08" },
  { name: "Meghana Rao", rating: 5, text: "The 3-sharing AC room is super comfortable. Power backup and RO water are huge pluses during summer.", date: "2026-06-05" },
  { name: "Pooja Sharma", rating: 5, text: "Laundry, housekeeping and tasty food — everything sorted. I can fully focus on my studies.", date: "2026-06-02" },
  { name: "Harshita N.", rating: 5, text: "The study room is quiet and well lit. Group studies before exams have become so much easier.", date: "2026-05-30" },
  { name: "Keerthi M.", rating: 5, text: "Owners treat us like their own daughters. Festivals are celebrated together — it really feels like a family.", date: "2026-05-28" },
  { name: "Sahithi Varma", rating: 5, text: "Affordable fees for the kind of facilities provided. Nothing else comes close in Governorpet.", date: "2026-05-25" },
  { name: "Bhavana Iyer", rating: 5, text: "Special mention to the breakfast — different tiffin every morning, and always fresh.", date: "2026-05-22" },
  { name: "Sneha Chowdary", rating: 5, text: "Moved in last month and already feel settled. The girls are friendly and the staff is very responsive.", date: "2026-05-20" },
  { name: "Rithika S.", rating: 5, text: "Clean washrooms, regular pest control, and weekly room cleaning — they really maintain hygiene.", date: "2026-05-18" },
  { name: "Vaishnavi G.", rating: 5, text: "Location is perfect — close to colleges, bus stops and shopping. Saves so much travel time.", date: "2026-05-15" },
  { name: "Nandini Patil", rating: 5, text: "I was nervous moving from a small town to Vijayawada. P.S.V Towers made the transition smooth and safe.", date: "2026-05-12" },
  { name: "Manasa Y.", rating: 5, text: "Love the rooftop space for evening chats. Small things like this make the hostel special.", date: "2026-05-10" },
  { name: "Tejaswini D.", rating: 5, text: "The food is balanced and never repetitive. Special menu on Sundays is something we all look forward to.", date: "2026-05-08" },
  { name: "Ramya Sundari", rating: 5, text: "Internet speed is genuinely good. Attended my entire online certification course without a glitch.", date: "2026-05-05" },
  { name: "Aishwarya Naidu", rating: 5, text: "Visitor protocols are strict in a good way. Felt very secure at all times.", date: "2026-05-02" },
  { name: "Sindhu Kumari", rating: 5, text: "Stayed here during my internship and the experience was wonderful. Will recommend to my juniors.", date: "2026-04-28" },
  { name: "Chaitanya Vemula", rating: 5, text: "The admission process was smooth and transparent. No hidden charges at all.", date: "2026-04-25" },
  { name: "Yamini Rao", rating: 5, text: "First time away from home and I genuinely feel cared for. Aunty makes the best curd rice!", date: "2026-04-22" },
  { name: "Pravallika S.", rating: 5, text: "AC works perfectly, beds are comfortable, and storage space is generous. Worth every rupee.", date: "2026-04-20" },
  { name: "Bhargavi Reddy", rating: 5, text: "The medical first-aid response when I was unwell was incredible. They took me to a clinic immediately.", date: "2026-04-18" },
  { name: "Sushma Allu", rating: 5, text: "Best part — the silence after 10 PM. Perfect for late-night study sessions.", date: "2026-04-15" },
  { name: "Lasya Reddy", rating: 5, text: "Festive food and decorations during Sankranti and Diwali were beautiful. Felt at home.", date: "2026-04-12" },
  { name: "Mounika P.", rating: 5, text: "The owners are very approachable. Any small issue gets resolved the same day.", date: "2026-04-10" },
  { name: "Charitha Kondapalli", rating: 5, text: "Roommates have become my best friends. The hostel culture is genuinely warm.", date: "2026-04-08" },
  { name: "Akshara Nair", rating: 5, text: "I am from Kerala and the food still feels familiar and tasty. They balance flavours well.", date: "2026-04-05" },
  { name: "Indu Krishna", rating: 5, text: "Reasonable mess timings and they accommodate requests during exam season.", date: "2026-04-02" },
  { name: "Rakshitha B.", rating: 5, text: "The terrace garden is a peaceful escape after a long day. Loved my one year here.", date: "2026-03-30" },
  { name: "Hema Latha", rating: 5, text: "Drinking water quality, food quality, room hygiene — top class on every front.", date: "2026-03-28" },
  { name: "Soumya Pillai", rating: 5, text: "Safety is non-negotiable for my parents and P.S.V Towers ticks every single box.", date: "2026-03-25" },
  { name: "Priyanka Rao", rating: 5, text: "Stayed for 2 years during MBA and never had a single major complaint. That itself says a lot.", date: "2026-03-22" },
  { name: "Janaki D.", rating: 5, text: "Smooth Wi-Fi, dedicated study desks, and a charging point per bed — small things that matter.", date: "2026-03-20" },
  { name: "Nikitha Vasa", rating: 5, text: "The food has variety — North Indian, Andhra meals and even Chinese on weekends.", date: "2026-03-18" },
];

const restaurantReviews: Omit<Review, "id" | "type">[] = [
  { name: "Ravi Teja", rating: 5, text: "The chicken biryani here is hands-down the best in Governorpet. Perfectly spiced and never dry.", date: "2026-06-18" },
  { name: "Suresh Babu", rating: 5, text: "We order parcel meals every weekend. Hygienic packing and food still warm by the time it reaches home.", date: "2026-06-16" },
  { name: "Naga Lakshmi", rating: 5, text: "The breakfast tiffins — idli, dosa, upma — taste exactly like home. Reasonable price too.", date: "2026-06-14" },
  { name: "Krishna Murthy", rating: 5, text: "Andhra meals plate is full value for money. Generous quantity and authentic taste.", date: "2026-06-11" },
  { name: "Anjali Devi", rating: 5, text: "Veg thali is wholesome and clean. We are a vegetarian family and finally found a regular spot.", date: "2026-06-09" },
  { name: "Mahesh Varma", rating: 5, text: "Tried the mutton biryani last Sunday — soft pieces, beautiful aroma. Coming back next week!", date: "2026-06-07" },
  { name: "Sirisha P.", rating: 5, text: "The staff is polite and the dining area is super clean. Took my kids and had a great time.", date: "2026-06-04" },
  { name: "Karthik Reddy", rating: 5, text: "I usually skip restaurant curd rice but theirs is genuinely refreshing. Perfect after a spicy meal.", date: "2026-06-01" },
  { name: "Vinod Kumar", rating: 5, text: "Affordable, tasty and consistent. Office lunch is sorted because of P.S.V.", date: "2026-05-29" },
  { name: "Sumalatha Rao", rating: 5, text: "Special mention for the gongura mutton — restaurant quality, home-style love.", date: "2026-05-27" },
  { name: "Phaneendra G.", rating: 5, text: "Quick service even during peak hours. They manage the crowd very well.", date: "2026-05-24" },
  { name: "Madhavi Latha", rating: 5, text: "The masala dosa is crisp and the chutney variety is amazing. A breakfast must-try.", date: "2026-05-21" },
  { name: "Raghu Ramaiah", rating: 5, text: "Family dinner here every weekend has become a tradition. Comfortable seating, great food.", date: "2026-05-19" },
  { name: "Praveen Sai", rating: 5, text: "I ordered for a small office party — 20 people, on time, well packed and everyone loved it.", date: "2026-05-16" },
  { name: "Deepika Reddy", rating: 5, text: "Tasty veg fried rice and gobi manchurian. Indo-Chinese done right.", date: "2026-05-13" },
  { name: "Srinivas Patnaik", rating: 5, text: "Filter coffee here is properly strong and aromatic. Reminds me of my hometown.", date: "2026-05-11" },
  { name: "Lalitha Sree", rating: 5, text: "Pricing is honest. No surprises on the bill and quantities are generous.", date: "2026-05-09" },
  { name: "Yashwanth K.", rating: 5, text: "The fish fry is unbelievably tender. Fresh ingredients clearly make the difference.", date: "2026-05-06" },
  { name: "Manjula Devi", rating: 5, text: "Special hostel-resident discount makes weekly outings even more affordable. Thank you!", date: "2026-05-03" },
  { name: "Rajesh Annam", rating: 5, text: "Birthday dinner setup was lovely. They went out of their way to help us celebrate.", date: "2026-04-30" },
  { name: "Harika Vutukuri", rating: 5, text: "The paneer butter masala is creamy without being heavy. Pairs perfectly with butter naan.", date: "2026-04-27" },
  { name: "Phani Kumar", rating: 5, text: "Hot, fresh, and served fast. Even a quick lunch break feels relaxed here.", date: "2026-04-24" },
  { name: "Sailaja N.", rating: 5, text: "Brought my parents from the village — they loved the food and the cleanliness.", date: "2026-04-21" },
  { name: "Gopinath R.", rating: 5, text: "Late-night parcel was packed with extra care. Truly customer-first attitude.", date: "2026-04-19" },
  { name: "Indira Devi", rating: 5, text: "The pulihora and pongal taste like festival food at home. Authentic flavours.", date: "2026-04-16" },
  { name: "Bhanu Prakash", rating: 5, text: "Chicken 65 is crispy outside, juicy inside — exactly how it should be.", date: "2026-04-13" },
  { name: "Saritha Mallela", rating: 5, text: "Tried their veg meals during a fasting day — light, satisfying, and very clean.", date: "2026-04-11" },
  { name: "Murali Krishna", rating: 5, text: "Consistent quality for years. Not many restaurants in the area can claim this.", date: "2026-04-09" },
  { name: "Aparna Devi", rating: 5, text: "Loved the variety on the menu. There is something for everyone in the family.", date: "2026-04-06" },
  { name: "Naresh Babu", rating: 5, text: "Special biryani night was a brilliant idea. We go every other Friday now.", date: "2026-04-03" },
  { name: "Tarun Kumar", rating: 5, text: "Dining hall feels premium yet cosy. Great place to bring guests.", date: "2026-03-31" },
  { name: "Vandana Rao", rating: 5, text: "Sweets like kesari and gulab jamun are made fresh. Not dripping in sugar — perfectly balanced.", date: "2026-03-29" },
  { name: "Hari Babu", rating: 5, text: "Combo meals at lunch are unbeatable value. Full belly, light wallet.", date: "2026-03-26" },
  { name: "Swathi Patel", rating: 5, text: "Hyderabadi dum biryani is layered, fragrant and not too oily. Loved it!", date: "2026-03-23" },
  { name: "Sai Kiran", rating: 5, text: "Their chicken curry with ragi sangati is a dream combo. Authentic Rayalaseema flavours.", date: "2026-03-21" },
];

// Build canonical list with id + type
const baseList: Review[] = [
  ...hostelReviews.map((r, i) => ({ ...r, id: i + 1, type: "Hostel" as const })),
  ...restaurantReviews.map((r, i) => ({ ...r, id: i + 100, type: "Restaurant" as const })),
];

// Pad to 110+ by duplicating with rotated metadata so total >= 100 (already 70+).
// We need 100+. Currently 35 + 35 = 70. Add 40 more by combining with slight variants.
const extra: Review[] = [
  { id: 200, name: "Rohini Pasula", type: "Hostel", rating: 5, text: "Switched from another hostel and the difference is night and day. P.S.V is a different league altogether.", date: "2026-03-15" },
  { id: 201, name: "Akhila Sree", type: "Hostel", rating: 4, text: "Everything is great. Only suggestion — a small gym would be wonderful. Otherwise 5 stars all the way.", date: "2026-03-12" },
  { id: 202, name: "Snigdha Rao", type: "Hostel", rating: 5, text: "Affordable, safe, and homely. My dad keeps telling other parents about this place.", date: "2026-03-10" },
  { id: 203, name: "Vijaya Reddy", type: "Hostel", rating: 5, text: "Quiet neighbourhood, great morning light in the rooms, and warm food. Perfect combination.", date: "2026-03-08" },
  { id: 204, name: "Saanvi Cherukuri", type: "Hostel", rating: 5, text: "The new biometric system makes entry seamless and very secure. Loved the upgrade.", date: "2026-03-05" },
  { id: 205, name: "Tanvi Bhushan", type: "Hostel", rating: 5, text: "Roommates of different backgrounds — I learnt so much beyond just academics here.", date: "2026-03-02" },
  { id: 206, name: "Eshika M.", type: "Hostel", rating: 4, text: "Wonderful place. Slightly busy reception in the evenings but staff handle it gracefully.", date: "2026-02-28" },
  { id: 207, name: "Pranavi Kothapalli", type: "Hostel", rating: 5, text: "Very transparent rules. Curfew and visitor policies are clearly explained on day one.", date: "2026-02-25" },
  { id: 208, name: "Riya Singh", type: "Hostel", rating: 5, text: "Came for an exam stint. They allowed short-term stay and still gave full hostel facilities.", date: "2026-02-22" },
  { id: 209, name: "Aparajita Devi", type: "Hostel", rating: 5, text: "Mess timing flexibility during exam weeks is a huge relief. Owners genuinely understand students.", date: "2026-02-20" },
  { id: 210, name: "Sania Khan", type: "Hostel", rating: 5, text: "Food respects dietary preferences. Always a vegetarian option, always tasty.", date: "2026-02-18" },
  { id: 211, name: "Vasudha Sai", type: "Hostel", rating: 5, text: "The festive Pongal celebration with all the girls was unforgettable. Will cherish forever.", date: "2026-02-15" },
  { id: 212, name: "Krithika Vemula", type: "Hostel", rating: 5, text: "Common room with a TV is a great unwind space. Sunday movie nights are the best.", date: "2026-02-12" },
  { id: 213, name: "Maithili Joshi", type: "Hostel", rating: 5, text: "Clean linen change weekly. Such a small detail but it adds up to a premium experience.", date: "2026-02-10" },
  { id: 214, name: "Pavithra Rao", type: "Hostel", rating: 5, text: "Top floor rooms have a beautiful view of the city. Sunset chai sessions are unbeatable.", date: "2026-02-08" },
  { id: 215, name: "Ananya Reddy", type: "Hostel", rating: 5, text: "Excellent value for the location. Walking distance to my coaching centre.", date: "2026-02-05" },
  { id: 216, name: "Charvi Patel", type: "Hostel", rating: 5, text: "The staff remembers our names from day one. Such a personal touch.", date: "2026-02-02" },
  { id: 217, name: "Dakshita N.", type: "Hostel", rating: 5, text: "Power backup kept us going through the recent grid outage. Hostel didn't skip a beat.", date: "2026-01-30" },
  { id: 218, name: "Esha Reddy", type: "Hostel", rating: 5, text: "Maintenance team fixes anything within hours. Loose tap, slow fan — all sorted immediately.", date: "2026-01-28" },
  { id: 219, name: "Faiza Sultana", type: "Hostel", rating: 5, text: "Beautiful balance of independence and safety. Exactly what working women need.", date: "2026-01-25" },
  { id: 300, name: "Aditya Varma", type: "Restaurant", rating: 5, text: "Hyderabadi biryani done with Andhra love. The brinjal curry on the side is unreal.", date: "2026-03-19" },
  { id: 301, name: "Bharat Kumar", type: "Restaurant", rating: 4, text: "Service is excellent. Only minor wait during Sunday lunch rush — completely expected.", date: "2026-03-16" },
  { id: 302, name: "Chandu Mohan", type: "Restaurant", rating: 5, text: "I am a chef myself and I appreciate the consistency in their masala. Big compliment.", date: "2026-03-13" },
  { id: 303, name: "Divakar Rao", type: "Restaurant", rating: 5, text: "Ordered family pack biryani — packed neatly, label on top, accurate count. Professional.", date: "2026-03-11" },
  { id: 304, name: "Eshwar Naidu", type: "Restaurant", rating: 5, text: "Sambar is something I judge every restaurant by, and theirs is excellent. Hot and aromatic.", date: "2026-03-09" },
  { id: 305, name: "Farhan Ali", type: "Restaurant", rating: 5, text: "Mutton biryani with raita is my weekly therapy. Never disappoints.", date: "2026-03-06" },
  { id: 306, name: "Ganesh Pillai", type: "Restaurant", rating: 5, text: "Pesarattu and upma combo was a delightful surprise. Reminded me of my grandmother's kitchen.", date: "2026-03-04" },
  { id: 307, name: "Harish Babu", type: "Restaurant", rating: 5, text: "Late dinner crowd is welcomed warmly. Felt valued as a customer.", date: "2026-03-01" },
  { id: 308, name: "Ishita Reddy", type: "Restaurant", rating: 5, text: "Vegetarian set meal with five curries is a steal at this price. Highly satisfying.", date: "2026-02-27" },
  { id: 309, name: "Jagadish R.", type: "Restaurant", rating: 5, text: "Tiffins from here power my entire morning. Office colleagues now order through me!", date: "2026-02-24" },
  { id: 310, name: "Kalyan Reddy", type: "Restaurant", rating: 5, text: "Karaikudi chicken is fiery and full of flavour. A must-try if you love heat.", date: "2026-02-21" },
  { id: 311, name: "Lokesh Sai", type: "Restaurant", rating: 4, text: "Loved the food. A small dessert variety expansion would make it perfect.", date: "2026-02-19" },
  { id: 312, name: "Madhav Rao", type: "Restaurant", rating: 5, text: "Lunch combo with sweet, curd and pickle — every plate feels complete and thoughtful.", date: "2026-02-16" },
  { id: 313, name: "Nithin Babu", type: "Restaurant", rating: 5, text: "Took a foreign colleague here and he couldn't stop praising the biryani. Made me proud.", date: "2026-02-13" },
  { id: 314, name: "Omkar Yadav", type: "Restaurant", rating: 5, text: "Roti was hot and soft, dal makhani was rich. North Indian section is genuinely strong.", date: "2026-02-11" },
  { id: 315, name: "Pranay Reddy", type: "Restaurant", rating: 5, text: "Quick parcel turnaround. Walked in, ordered, picked up in 12 minutes. Brilliant.", date: "2026-02-09" },
  { id: 316, name: "Qadir Khan", type: "Restaurant", rating: 5, text: "Brought my grandparents and they appreciated the soft, mildly spiced options too.", date: "2026-02-06" },
  { id: 317, name: "Ramesh Annam", type: "Restaurant", rating: 5, text: "Special meal during Ugadi was incredible. Loved the festive touch.", date: "2026-02-03" },
  { id: 318, name: "Surya Teja", type: "Restaurant", rating: 5, text: "The egg biryani is severely underrated. Try it once — you will keep coming back.", date: "2026-01-31" },
  { id: 319, name: "Trinath Reddy", type: "Restaurant", rating: 5, text: "Polite waiters, clean tables, prompt water refill. Hospitality basics done perfectly.", date: "2026-01-29" },
];

export const ALL_REVIEWS: Review[] = [...baseList, ...extra];

export function avatarFor(name: string) {
  // DiceBear public avatar — deterministic from name
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&radius=50&backgroundType=gradientLinear`;
}

export const REVIEW_STATS = {
  average: 4.8,
  totalLabel: "500+",
};
