/* 30-Day Study Tracker — multi-plan edition
 * Plain JS, no dependencies. Each plan keeps its own progress in localStorage,
 * plus JSON export/import of everything.
 *
 * Weekday/weekend rhythm is derived from the day number (Day 1 = Monday),
 * so each plan only needs { subject, topics[], fact } per day.
 */

// Reusable color palette
const C = {
  red: "#e0567a", blue: "#5b8def", green: "#2bb673", orange: "#f0932b",
  purple: "#9b59b6", cyan: "#38bdf8", pink: "#ec4899", teal: "#14b8a6",
  amber: "#f59e0b", indigo: "#6366f1",
};
const MIX = { name: "Revision", color: C.purple };

const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function dayMeta(dayNum) {
  const dow = (dayNum - 1) % 7; // 0=Mon … 5=Sat, 6=Sun
  return { weekday: WEEKDAY_NAMES[dow], type: dow >= 5 ? "weekend" : "weekday" };
}

// ---------------------------------------------------------------------------
// PLANS
// ---------------------------------------------------------------------------
const PLANS = [
  // ======================= 1) CS FUNDAMENTALS =======================
  {
    id: "cs-fundamentals", name: "CS Fundamentals", emoji: "🖥️",
    tagline: "OS · DBMS · Computer Networks · OOPs",
    subjects: { OS: { name: "Operating Systems", color: C.red }, DBMS: { name: "DBMS", color: C.blue }, CN: { name: "Computer Networks", color: C.green }, OOP: { name: "OOPs", color: C.orange }, MIX },
    days: [
      { subject: "OS", topics: ["Intro to OS & types of OS", "Process vs Program, user vs kernel mode"], fact: "The term 'bug' comes from a real moth found in the Harvard Mark II in 1947." },
      { subject: "DBMS", topics: ["What is a DBMS, DBMS vs File system", "ER model: entities, attributes, relationships"], fact: "SQL was originally called SEQUEL until a trademark forced the rename." },
      { subject: "CN", topics: ["Intro to networks & the OSI 7-layer model", "TCP/IP model & layer mapping"], fact: "The first ARPANET message in 1969 crashed after just two letters: 'LO'." },
      { subject: "OOP", topics: ["4 pillars of OOP (overview)", "Classes & Objects, constructors"], fact: "Simula (1967) was the first object-oriented language, built for simulations." },
      { subject: "OS", topics: ["Process states & the PCB", "Context switching & schedulers"], fact: "A context switch can cost thousands of CPU cycles — hence they're minimized." },
      { subject: "MIX", topics: ["Revise Week-1 OS notes", "Revise OSI & TCP/IP models", "Practice: draw 2 ER diagrams", "Write a class in your language", "Flashcards for terms"], fact: "Spaced repetition (day 1, 3, 7) can roughly double long-term retention." },
      { subject: "MIX", topics: ["Scheduling warm-up numericals", "SQL SELECT/WHERE/ORDER BY practice", "Subnetting basics", "OOP concepts self-quiz", "Weekly recap notes"], fact: "The Feynman technique — teaching aloud — exposes gaps faster than re-reading." },
      { subject: "OS", topics: ["CPU scheduling: FCFS & SJF", "Preemptive vs non-preemptive"], fact: "Shortest-Job-First gives minimum average waiting time — but needs the future." },
      { subject: "DBMS", topics: ["Relational model & keys", "Normalization: 1NF & 2NF"], fact: "Normalization was invented by Edgar Codd, a Turing Award winner." },
      { subject: "CN", topics: ["Physical layer & transmission media", "Data link layer, framing & MAC"], fact: "Fiber carries data as light — near light-speed through glass." },
      { subject: "OOP", topics: ["Encapsulation & access modifiers", "Abstraction & abstract data types"], fact: "Encapsulation lets you drive a car without knowing the engine internals." },
      { subject: "OS", topics: ["Round Robin & Priority scheduling", "Solve 3 scheduling numericals"], fact: "Round Robin's time quantum: too small = overhead, too large = FCFS." },
      { subject: "MIX", topics: ["Normalization: 3NF & BCNF", "SQL JOINS practice", "Scheduling problem set", "Types of inheritance", "Revise Week-2 notes"], fact: "BCNF is stricter than 3NF — every determinant must be a candidate key." },
      { subject: "MIX", topics: ["ACID properties & transactions", "Error detection: parity, checksum, CRC", "Overloading vs overriding", "Mixed MCQ practice", "Weekly recap"], fact: "The 'D' in ACID keeps databases consistent through power loss mid-write." },
      { subject: "OS", topics: ["Process synchronization & race conditions", "Critical section problem"], fact: "The 'Dining Philosophers' models deadlock with five hungry thinkers." },
      { subject: "DBMS", topics: ["SQL DDL vs DML", "Aggregate functions & GROUP BY / HAVING"], fact: "HAVING filters groups after aggregation; WHERE filters rows before it." },
      { subject: "CN", topics: ["Network layer & IPv4 addressing", "Routing algorithms overview"], fact: "The world ran out of fresh IPv4 addresses in 2011 — hence IPv6." },
      { subject: "OOP", topics: ["Inheritance in depth", "Polymorphism & dynamic dispatch"], fact: "Virtual functions use a hidden 'vtable' to pick methods at runtime." },
      { subject: "OS", topics: ["Semaphores & mutex", "Deadlock: conditions & intro"], fact: "Dijkstra invented semaphores in 1965; 'P' and 'V' are Dutch words." },
      { subject: "MIX", topics: ["Deadlock avoidance (Banker's)", "DBMS concurrency control & locks", "Subnetting & CIDR", "Abstract classes vs interfaces", "Revise Week-3"], fact: "Banker's algorithm mirrors a bank never lending more than it can cover." },
      { subject: "MIX", topics: ["Banker's numericals", "Indexing: B-tree vs B+ tree", "TCP vs UDP", "SOLID principles", "Weekly recap"], fact: "B+ trees keep data in leaves for fast range scans — most DBs use them." },
      { subject: "OS", topics: ["Memory management basics", "Paging & segmentation"], fact: "Paging removes external fragmentation using fixed-size frames." },
      { subject: "DBMS", topics: ["Indexing & hashing", "Query optimization basics"], fact: "A missing index can turn a 1 ms query into a full scan of millions of rows." },
      { subject: "CN", topics: ["TCP 3-way handshake", "Flow control & congestion control"], fact: "SYN, SYN-ACK, ACK set up a reliable link before any data flows." },
      { subject: "OOP", topics: ["Association, aggregation, composition", "Intro to design patterns"], fact: "'Favor composition over inheritance' is a core OOP maxim." },
      { subject: "OS", topics: ["Virtual memory & demand paging", "Page replacement: FIFO, LRU, Optimal & thrashing"], fact: "Belady's anomaly: more frames can cause MORE page faults under FIFO." },
      { subject: "MIX", topics: ["Page-replacement numericals", "Application layer: HTTP, DNS, DHCP", "DBMS deadlock & recovery", "Singleton & Factory", "Revise Week-4"], fact: "Every site visit triggers a DNS lookup — the internet's phone book." },
      { subject: "MIX", topics: ["Disk scheduling: FCFS, SCAN, C-SCAN", "SQL vs NoSQL trade-offs", "Network security basics", "Full OOPs revision", "Weekly recap"], fact: "The disk 'elevator algorithm' (SCAN) works exactly like a real elevator." },
      { subject: "MIX", topics: ["Full OS revision + mock questions", "Full DBMS revision + mock questions"], fact: "Interleaving subjects while revising beats blocking one topic for hours." },
      { subject: "MIX", topics: ["Full CN revision + mock questions", "Full OOPs revision + interview Qs"], fact: "30 days of consistency beats one heroic all-nighter. 🎉" },
    ],
  },

  // ======================= 2) DSA =======================
  {
    id: "dsa", name: "DSA", emoji: "🧩",
    tagline: "Data Structures & Algorithms",
    subjects: { ARR: { name: "Arrays / Strings", color: C.blue }, LL: { name: "Lists / Stacks", color: C.teal }, TREE: { name: "Trees / Heaps", color: C.green }, GRAPH: { name: "Graphs", color: C.orange }, DP: { name: "DP / Greedy", color: C.pink }, MIX },
    days: [
      { subject: "ARR", topics: ["Arrays & strings basics, two pointers", "Big-O: time & space complexity"], fact: "Big-O ignores constants — an O(n) with huge constant can lose to O(n log n)." },
      { subject: "LL", topics: ["Singly linked list operations", "Reverse a linked list (iterative & recursive)"], fact: "Floyd's tortoise-and-hare finds a loop using two pointers at different speeds." },
      { subject: "TREE", topics: ["Binary tree basics", "Traversals: inorder, preorder, postorder"], fact: "Inorder traversal of a BST yields elements in sorted order." },
      { subject: "GRAPH", topics: ["Graph representations (list vs matrix)", "Breadth-First Search (BFS)"], fact: "BFS finds the shortest path in an unweighted graph, level by level." },
      { subject: "ARR", topics: ["Sliding window technique", "Prefix sums"], fact: "Prefix sums turn range-sum queries from O(n) into O(1)." },
      { subject: "MIX", topics: ["Solve 6 easy array/string problems", "Revise complexity analysis", "Two-pointer patterns", "Binary search practice", "Notes"], fact: "Most 'hard' array problems reduce to two pointers or a sliding window." },
      { subject: "MIX", topics: ["Sorting: merge & quick sort", "5 linked-list problems", "DFS practice", "Weekly recap"], fact: "Quicksort averages O(n log n) but degrades to O(n²) on bad pivots." },
      { subject: "ARR", topics: ["Binary search + variants", "Search in rotated sorted array"], fact: "Binary search is simple but famously buggy — overflow in mid is a classic." },
      { subject: "LL", topics: ["Stacks & queues (array/LL impl)", "Monotonic stack pattern"], fact: "A monotonic stack solves 'next greater element' in a single pass." },
      { subject: "TREE", topics: ["BST operations", "Validate BST & Lowest Common Ancestor"], fact: "A balanced BST keeps search at O(log n); a skewed one degrades to O(n)." },
      { subject: "GRAPH", topics: ["DFS in depth", "Connected components & cycle detection"], fact: "DFS uses a stack (or recursion); BFS uses a queue." },
      { subject: "DP", topics: ["Recursion & memoization", "Fibonacci, climbing stairs"], fact: "Memoization turns exponential recursion into linear time by caching." },
      { subject: "MIX", topics: ["6 tree problems", "Heaps & priority queues", "Trie intro", "Timed contest #1", "Notes"], fact: "A heap gives O(1) access to the min/max and O(log n) insert." },
      { subject: "MIX", topics: ["1D DP problem set", "Graph BFS/DFS problem set", "Revise sorting", "Weekly recap"], fact: "Interleaving problem types trains pattern recognition better than blocks." },
      { subject: "DP", topics: ["1D DP: house robber, coin change", "Identifying DP patterns"], fact: "If a problem has overlapping subproblems + optimal substructure, think DP." },
      { subject: "TREE", topics: ["Heaps, heapify, top-K", "Priority-queue problems"], fact: "Heapsort sorts in-place in O(n log n) with no extra memory." },
      { subject: "GRAPH", topics: ["Dijkstra's shortest path", "Weighted graphs"], fact: "Dijkstra fails with negative edges — use Bellman-Ford there." },
      { subject: "DP", topics: ["2D DP: grid paths, LCS", "0/1 Knapsack"], fact: "The knapsack problem is NP-complete in general but DP-solvable for integer weights." },
      { subject: "ARR", topics: ["Hashing & hash maps", "Two-sum family"], fact: "Hash maps give average O(1) lookup — the workhorse of coding interviews." },
      { subject: "MIX", topics: ["Backtracking: subsets & permutations", "5 DP problems", "Trie problems", "Timed contest #2", "Notes"], fact: "Backtracking = DFS on the solution space with pruning." },
      { subject: "MIX", topics: ["Topological sort & Union-Find", "Sliding-window problem set", "Weekly recap"], fact: "Topological sort only exists for a DAG — a cycle makes it impossible." },
      { subject: "DP", topics: ["Knapsack variants", "DP on subsequences"], fact: "Many string problems (LCS, edit distance) are subsequence DPs in disguise." },
      { subject: "GRAPH", topics: ["Union-Find (DSU)", "MST: Kruskal & Prim"], fact: "Union-Find with path compression is nearly O(1) per operation." },
      { subject: "TREE", topics: ["Trie deep dive", "Segment trees & range queries"], fact: "A segment tree answers range queries and updates both in O(log n)." },
      { subject: "DP", topics: ["DP on strings: edit distance", "Palindrome DP"], fact: "Edit distance powers spell-checkers and DNA sequence alignment." },
      { subject: "ARR", topics: ["Bit manipulation", "XOR tricks"], fact: "XOR-ing all elements finds the single unpaired number in O(1) space." },
      { subject: "MIX", topics: ["6 graph problems", "Advanced DP set", "Timed contest #3", "Notes"], fact: "Grinding curated lists (Blind 75, NeetCode) beats random problem picking." },
      { subject: "MIX", topics: ["Greedy algorithms & problems", "Interval problems", "Weekly recap"], fact: "Greedy works only when a local optimum guarantees a global one — prove it." },
      { subject: "MIX", topics: ["Mock interview set #1 (mixed)", "Revise weak topics"], fact: "Explaining your approach aloud is scored as high as the code itself." },
      { subject: "MIX", topics: ["Mock interview set #2", "Pattern cheat-sheet review"], fact: "~15 core patterns cover the majority of interview questions. 🎯" },
    ],
  },

  // ======================= 3) LOW LEVEL SYSTEM DESIGN =======================
  {
    id: "lld", name: "Low-Level Design", emoji: "🧱",
    tagline: "OOD · Design Patterns · LLD case studies",
    subjects: { OOD: { name: "OO Design", color: C.blue }, PAT: { name: "Design Patterns", color: C.orange }, UML: { name: "UML / Modeling", color: C.teal }, CASE: { name: "Case Studies", color: C.green }, CONC: { name: "Concurrency", color: C.pink }, MIX },
    days: [
      { subject: "OOD", topics: ["SOLID overview", "SRP & OCP in depth"], fact: "The 'S' in SOLID — one reason to change per class — prevents fragile code." },
      { subject: "PAT", topics: ["Creational: Singleton", "Creational: Factory & Factory Method"], fact: "The 'Gang of Four' book (1994) catalogued 23 patterns still used today." },
      { subject: "UML", topics: ["Class diagrams & relationships", "Sequence diagrams"], fact: "UML has 14 diagram types, but class + sequence cover most interviews." },
      { subject: "CASE", topics: ["Design a Parking Lot: requirements", "Identify entities & classes"], fact: "Parking Lot is the 'hello world' of LLD interviews." },
      { subject: "OOD", topics: ["Liskov, ISP, DIP", "Composition over inheritance"], fact: "Liskov: a subclass must be usable anywhere its parent is — no surprises." },
      { subject: "MIX", topics: ["Implement Parking Lot in code", "Revise SOLID", "Practice class diagrams", "Read a Clean Code chapter", "Notes"], fact: "Interviewers watch how you clarify requirements before any code." },
      { subject: "MIX", topics: ["Creational patterns practice", "Design an Elevator system", "Weekly recap"], fact: "Elevator design is really a state machine plus a scheduling policy." },
      { subject: "PAT", topics: ["Structural: Adapter & Decorator", "Facade & Proxy"], fact: "Java's InputStream classes are a textbook Decorator pattern." },
      { subject: "CASE", topics: ["Design a Library Management System", "Model books, members, loans"], fact: "Good LLD names classes after real-world nouns from the problem." },
      { subject: "CONC", topics: ["Threads, locks, race conditions", "Thread-safe Singleton (double-checked locking)"], fact: "Double-checked locking was subtly broken in Java until the volatile fix." },
      { subject: "PAT", topics: ["Behavioral: Observer & Strategy", "State & Command"], fact: "The Observer pattern is the backbone of every event/pub-sub system." },
      { subject: "OOD", topics: ["DRY, YAGNI, KISS", "Cohesion & coupling"], fact: "High cohesion + low coupling is the north star of maintainable design." },
      { subject: "MIX", topics: ["Implement Library system", "Pattern quiz", "Design a Vending Machine", "Mock LLD round", "Notes"], fact: "A Vending Machine is a classic State-pattern exercise." },
      { subject: "MIX", topics: ["Observer & Strategy in code", "Design Splitwise", "Weekly recap"], fact: "Splitwise is a graph-of-debts simplification problem underneath." },
      { subject: "CASE", topics: ["Design Chess / Tic-tac-toe (OOD)", "Board, pieces, rules"], fact: "Modeling chess pieces is a natural fit for polymorphism." },
      { subject: "PAT", topics: ["Builder & Prototype", "Chain of Responsibility"], fact: "The Builder pattern tames constructors with many optional parameters." },
      { subject: "CONC", topics: ["Producer–consumer problem", "BlockingQueue design"], fact: "A bounded blocking queue naturally throttles a fast producer." },
      { subject: "CASE", topics: ["Design a Rate Limiter (LLD)", "Token bucket classes"], fact: "Token bucket allows bursts; leaky bucket smooths them out." },
      { subject: "OOD", topics: ["Refactoring techniques", "Recognizing code smells"], fact: "'Refactoring' means changing structure without changing behavior." },
      { subject: "MIX", topics: ["Implement Rate Limiter", "Design a Notification system", "Patterns recap", "Mock round", "Notes"], fact: "Notification systems shine with Strategy (channel) + Observer (events)." },
      { subject: "MIX", topics: ["Design an LRU Cache", "Design a Logger", "Weekly recap"], fact: "LRU Cache = hash map + doubly linked list for O(1) get/put." },
      { subject: "CASE", topics: ["Design cab booking (Uber core LLD)", "Riders, drivers, matching"], fact: "Separate the matching policy from entities so it can evolve." },
      { subject: "PAT", topics: ["Template Method, Iterator, Mediator", "Visitor"], fact: "Visitor lets you add operations to a class hierarchy without editing it." },
      { subject: "CONC", topics: ["Thread pools & executors", "Deadlock avoidance in design"], fact: "Always acquire multiple locks in a fixed global order to dodge deadlock." },
      { subject: "CASE", topics: ["Design an ATM machine", "State transitions & transactions"], fact: "ATM design combines the State pattern with a strict transaction flow." },
      { subject: "OOD", topics: ["Domain modeling & DDD basics", "Entities vs value objects"], fact: "A value object has no identity — two are equal if their fields match." },
      { subject: "MIX", topics: ["Implement LRU Cache & Logger", "Design Snake & Ladder", "Mock round", "Notes"], fact: "Snake & Ladder is a simple graph-plus-dice modeling warm-up." },
      { subject: "MIX", topics: ["Design a Food-delivery LLD", "Pattern cheat-sheet", "Weekly recap"], fact: "Know when NOT to use a pattern — over-engineering is a real smell." },
      { subject: "MIX", topics: ["Mock LLD interview #1", "Revise weak patterns"], fact: "Interviewers reward clean extensible code over cramming every pattern." },
      { subject: "MIX", topics: ["Mock LLD interview #2", "Cheat-sheet review"], fact: "The best design is the simplest one that meets the requirements. ✅" },
    ],
  },

  // ======================= 4) HIGH LEVEL SYSTEM DESIGN =======================
  {
    id: "hld", name: "High-Level Design", emoji: "🏗️",
    tagline: "Scalability · Distributed systems · HLD",
    subjects: { FUND: { name: "Fundamentals", color: C.blue }, DATA: { name: "Data & Storage", color: C.green }, SCALE: { name: "Scaling & Caching", color: C.orange }, MSG: { name: "Messaging", color: C.pink }, CASE: { name: "Case Studies", color: C.teal }, MIX },
    days: [
      { subject: "FUND", topics: ["Client-server, DNS, load balancing", "Latency vs throughput"], fact: "A round trip across the globe takes ~150 ms — physics you can't cache away." },
      { subject: "FUND", topics: ["Horizontal vs vertical scaling", "Stateless services"], fact: "Stateless servers scale out freely because any node can serve any request." },
      { subject: "DATA", topics: ["SQL vs NoSQL trade-offs", "CAP theorem"], fact: "CAP: during a partition you must pick consistency OR availability, not both." },
      { subject: "SCALE", topics: ["Caching strategies", "Redis, eviction policies, CDNs"], fact: "'There are only two hard things: cache invalidation and naming things.'" },
      { subject: "FUND", topics: ["Consistency models", "PACELC theorem"], fact: "PACELC extends CAP: even without partitions you trade latency vs consistency." },
      { subject: "MIX", topics: ["Design a URL shortener (TinyURL)", "Revise CAP", "Back-of-envelope estimation", "Read an HLD article", "Notes"], fact: "Always start HLD with capacity estimation — QPS, storage, bandwidth." },
      { subject: "MIX", topics: ["Load-balancing algorithms deep", "Design a rate limiter (HLD)", "Weekly recap"], fact: "Consistent hashing lets you add servers without reshuffling all keys." },
      { subject: "DATA", topics: ["Sharding & partitioning", "Replication (leader-follower)"], fact: "Sharding splits data horizontally; replication copies it for reads/HA." },
      { subject: "DATA", topics: ["Indexing at scale & denormalization", "Consistent hashing"], fact: "Denormalization trades storage and write cost for faster reads." },
      { subject: "MSG", topics: ["Message queues (Kafka, RabbitMQ)", "Pub/sub & event-driven design"], fact: "Kafka can retain messages for days, acting as a replayable log." },
      { subject: "SCALE", topics: ["API gateway & reverse proxy", "Microservices vs monolith"], fact: "Start monolith-first; split to microservices only when the pain is real." },
      { subject: "FUND", topics: ["Idempotency, retries, timeouts", "Circuit breaker pattern"], fact: "Idempotency keys make a retried payment charge the customer only once." },
      { subject: "MIX", topics: ["Design a News Feed (Twitter/FB)", "Consistent hashing practice", "Kafka deep dive", "Mock round", "Notes"], fact: "Feeds choose fan-out on write (fast reads) vs on read (cheap writes)." },
      { subject: "MIX", topics: ["Design a Chat system (WhatsApp)", "Weekly recap"], fact: "Chat systems lean on long-lived WebSocket connections, not polling." },
      { subject: "DATA", topics: ["Blob / object storage (S3)", "Data lakes vs warehouses"], fact: "Object storage scales to exabytes because there's no filesystem tree." },
      { subject: "SCALE", topics: ["Rate limiting at scale", "Bloom filters"], fact: "A Bloom filter says 'maybe present' or 'definitely absent' in tiny space." },
      { subject: "MSG", topics: ["Stream processing", "Exactly-once semantics"], fact: "'Exactly-once' is usually at-least-once delivery plus idempotent handling." },
      { subject: "CASE", topics: ["Design a Notification system", "Push / email / SMS fan-out"], fact: "Decouple producers from channels with a queue so spikes don't drop alerts." },
      { subject: "FUND", topics: ["Monitoring, logging, observability", "Health checks"], fact: "Observability's three pillars: metrics, logs, and traces." },
      { subject: "MIX", topics: ["Design YouTube/Netflix (streaming)", "CDN deep dive", "Estimation practice", "Mock round", "Notes"], fact: "Video is pre-encoded into many bitrates so playback adapts to bandwidth." },
      { subject: "MIX", topics: ["Design an e-commerce (Amazon) system", "Weekly recap"], fact: "Inventory + payments need strong consistency; catalog can be eventual." },
      { subject: "DATA", topics: ["Search systems (Elasticsearch)", "Inverted index"], fact: "An inverted index maps each word to the docs containing it — like a book index." },
      { subject: "SCALE", topics: ["Geo-distributed systems", "Multi-region & latency"], fact: "Serving users from the nearest region can cut latency by 100+ ms." },
      { subject: "MSG", topics: ["Distributed transactions & Saga", "2PC vs eventual consistency"], fact: "The Saga pattern replaces distributed locks with compensating actions." },
      { subject: "CASE", topics: ["Design Uber/Lyft", "Location, geo-indexing, matching"], fact: "Geohashing / quadtrees make 'find nearby drivers' fast at city scale." },
      { subject: "FUND", topics: ["Security: auth, OAuth, API keys", "TLS & rate limiting"], fact: "OAuth grants access without ever sharing your actual password." },
      { subject: "MIX", topics: ["Design a Payment system", "Consensus (Raft/Paxos) intro", "Mock round", "Notes"], fact: "Raft was designed to be understandable — Paxos was infamously not." },
      { subject: "MIX", topics: ["Design a Distributed cache", "Design Google Docs (collab)", "Weekly recap"], fact: "Real-time collab uses CRDTs or OT to merge concurrent edits safely." },
      { subject: "MIX", topics: ["Mock HLD interview #1", "Revise weak areas"], fact: "State assumptions out loud — HLD interviews reward structured thinking." },
      { subject: "MIX", topics: ["Mock HLD interview #2", "Cheat-sheet & templates"], fact: "Requirements → estimation → API → data → scale: a reusable HLD template. 🧭" },
    ],
  },

  // ======================= 5) RAG FOR AI =======================
  {
    id: "rag", name: "RAG for AI", emoji: "🤖",
    tagline: "Retrieval-Augmented Generation, end to end",
    subjects: { FND: { name: "Foundations", color: C.blue }, RET: { name: "Retrieval", color: C.green }, PIPE: { name: "Pipeline", color: C.orange }, ADV: { name: "Advanced RAG", color: C.pink }, EVAL: { name: "Eval & Prod", color: C.teal }, MIX },
    days: [
      { subject: "FND", topics: ["LLM basics: tokens & context window", "Prompting fundamentals"], fact: "Context windows are finite — RAG exists to feed models only what matters." },
      { subject: "FND", topics: ["Embeddings explained", "Cosine similarity & semantic search"], fact: "Embeddings place similar meanings close together in vector space." },
      { subject: "RET", topics: ["Vector databases (FAISS, Chroma, Pinecone)", "Indexes: HNSW & IVF"], fact: "HNSW searches millions of vectors in milliseconds using a navigable graph." },
      { subject: "PIPE", topics: ["Document chunking strategies", "Chunk size & overlap trade-offs"], fact: "Too-large chunks dilute relevance; too-small ones lose context." },
      { subject: "FND", topics: ["Transformers & attention (overview)", "Encoder vs decoder models"], fact: "The 2017 'Attention Is All You Need' paper launched the transformer era." },
      { subject: "MIX", topics: ["Build a basic RAG over your notes", "Revise embeddings", "Try two vector DBs", "Read a RAG paper", "Notes"], fact: "The 2020 RAG paper first combined a retriever with a generator end to end." },
      { subject: "MIX", topics: ["Prompt engineering for RAG", "Compare chunking approaches", "Weekly recap"], fact: "Putting instructions before context often improves grounded answers." },
      { subject: "RET", topics: ["Similarity search: top-k & MMR", "Metadata filtering"], fact: "MMR balances relevance with diversity so results aren't near-duplicates." },
      { subject: "PIPE", topics: ["Ingestion pipeline design", "Loaders/parsers: PDF, HTML"], fact: "Garbage in, garbage out — parsing quality caps your retrieval quality." },
      { subject: "PIPE", topics: ["Retrieval + generation flow", "Context injection & prompt templates"], fact: "The retrieved chunks become the model's 'open-book' exam notes." },
      { subject: "ADV", topics: ["Hybrid search (BM25 + vector)", "Reciprocal rank fusion"], fact: "Keyword search still wins on exact terms like IDs and error codes." },
      { subject: "FND", topics: ["Fine-tuning vs RAG vs prompting", "When to use each"], fact: "RAG updates knowledge by changing data, not by retraining the model." },
      { subject: "MIX", topics: ["Add hybrid search to your RAG", "Build ingestion for PDFs", "Evaluate retrieval quality", "Mock", "Notes"], fact: "Hybrid retrieval typically beats pure vector search on real-world queries." },
      { subject: "MIX", topics: ["Re-ranking (cross-encoders)", "Weekly recap"], fact: "A cross-encoder re-scores candidates by reading query and doc together." },
      { subject: "ADV", topics: ["Query transformation (HyDE, multi-query)", "Query expansion"], fact: "HyDE generates a hypothetical answer, then retrieves against that." },
      { subject: "ADV", topics: ["Re-ranking in depth", "Lost-in-the-middle problem"], fact: "LLMs recall the start and end of context better than the middle." },
      { subject: "EVAL", topics: ["RAG evaluation with RAGAS", "Faithfulness & relevance metrics"], fact: "You can't improve a RAG you don't measure — retrieval and answer both count." },
      { subject: "ADV", topics: ["Agentic RAG & tool use", "Self-RAG & corrective RAG"], fact: "Agentic RAG lets the model decide whether and what to retrieve." },
      { subject: "PIPE", topics: ["Structured data & tables", "Multi-modal RAG intro"], fact: "Tables often need special handling — flattening them loses structure." },
      { subject: "MIX", topics: ["Add re-ranking + query rewriting", "Set up RAGAS eval", "Build agentic RAG", "Mock", "Notes"], fact: "Re-ranking a large candidate set is often the biggest quality win." },
      { subject: "MIX", topics: ["Graph RAG intro", "Knowledge graphs", "Weekly recap"], fact: "Graph RAG follows entity relationships to answer multi-hop questions." },
      { subject: "EVAL", topics: ["Reducing hallucinations", "Citations & grounding"], fact: "Requiring citations makes hallucinations easier to catch and trust higher." },
      { subject: "ADV", topics: ["Contextual retrieval", "Contextual embeddings"], fact: "Prepending chunk context before embedding can sharply cut retrieval failures." },
      { subject: "EVAL", topics: ["Chunking & retrieval metrics", "Precision / recall @ k"], fact: "Recall@k asks: did the right chunk make it into the top-k at all?" },
      { subject: "PIPE", topics: ["Caching, cost & latency tuning", "Semantic caching"], fact: "Semantic caching reuses answers for questions that mean the same thing." },
      { subject: "EVAL", topics: ["Production monitoring & guardrails", "PII & safety"], fact: "Guardrails should filter both what goes in and what comes out." },
      { subject: "MIX", topics: ["Optimize latency & cost", "Add guardrails", "Full eval run", "Mock", "Notes"], fact: "Most RAG latency hides in retrieval + re-ranking, not the LLM call." },
      { subject: "MIX", topics: ["Deploy RAG (API + UI)", "Scaling considerations", "Weekly recap"], fact: "Vector index size and freshness drive most production RAG costs." },
      { subject: "MIX", topics: ["Polish an end-to-end RAG project", "RAG interview questions"], fact: "A working demo over your own docs beats any amount of theory in interviews." },
      { subject: "MIX", topics: ["RAG system-design mock", "Cheat-sheet review"], fact: "Retrieve → (re-rank) → augment → generate → evaluate: the RAG loop. 🔁" },
    ],
  },

  // ======================= 6) KUBERNETES =======================
  {
    id: "k8s", name: "Kubernetes", emoji: "☸️",
    tagline: "Containers, orchestration & cloud-native ops",
    subjects: { CORE: { name: "Core Concepts", color: C.blue }, WORK: { name: "Workloads", color: C.green }, NET: { name: "Networking", color: C.orange }, STOR: { name: "Storage / Config", color: C.teal }, OPS: { name: "Ops & Security", color: C.pink }, MIX },
    days: [
      { subject: "CORE", topics: ["Containers vs VMs, Docker recap", "Why Kubernetes + architecture"], fact: "'Kubernetes' is Greek for helmsman; 'k8s' = K + 8 letters + s." },
      { subject: "CORE", topics: ["Pods & kubectl basics", "Writing YAML manifests"], fact: "The Pod, not the container, is Kubernetes' smallest deployable unit." },
      { subject: "WORK", topics: ["ReplicaSets & Deployments", "Rolling updates & rollbacks"], fact: "A Deployment can roll back to a previous version with one command." },
      { subject: "NET", topics: ["Services: ClusterIP, NodePort, LoadBalancer", "kube-proxy"], fact: "A Service gives Pods a stable virtual IP even as they come and go." },
      { subject: "CORE", topics: ["Namespaces, labels, selectors", "Annotations"], fact: "Labels are for selecting objects; annotations are for arbitrary metadata." },
      { subject: "MIX", topics: ["Set up a local cluster (minikube/kind)", "Deploy your first app", "Revise architecture", "Read the docs", "Notes"], fact: "Google runs billions of containers a week — Kubernetes grew from that." },
      { subject: "MIX", topics: ["kubectl deep practice", "Debug crashing pods", "Weekly recap"], fact: "'kubectl describe pod' is your first stop when something won't start." },
      { subject: "WORK", topics: ["ConfigMaps & Secrets", "Injecting environment config"], fact: "Secrets are only base64-encoded by default — enable encryption at rest." },
      { subject: "STOR", topics: ["Volumes, PV & PVC", "Storage classes"], fact: "A PersistentVolumeClaim lets pods request storage without knowing the backend." },
      { subject: "NET", topics: ["Ingress & Ingress controllers", "Path & host routing"], fact: "Ingress is just rules — you need a controller (NGINX, Traefik) to enforce them." },
      { subject: "WORK", topics: ["StatefulSets", "Headless services & ordered pods"], fact: "StatefulSets give pods stable names like db-0, db-1 for databases." },
      { subject: "WORK", topics: ["DaemonSets, Jobs, CronJobs", "Init containers"], fact: "A DaemonSet runs one pod per node — perfect for log or metric agents." },
      { subject: "MIX", topics: ["Deploy a stateful app (DB)", "Set up Ingress", "Persist data with PVC", "Mock", "Notes"], fact: "Init containers run to completion before the main container ever starts." },
      { subject: "MIX", topics: ["Helm charts intro", "Package your app", "Weekly recap"], fact: "Helm is the de-facto package manager for Kubernetes — charts, not code." },
      { subject: "CORE", topics: ["Resource requests & limits", "QoS classes"], fact: "Pods with no limits are the first killed when a node runs out of memory." },
      { subject: "WORK", topics: ["Horizontal Pod Autoscaler", "Metrics server"], fact: "The HPA adds or removes pods automatically based on CPU or custom metrics." },
      { subject: "NET", topics: ["Network policies", "Pod-to-pod security"], fact: "By default every pod can talk to every other — NetworkPolicies lock that down." },
      { subject: "STOR", topics: ["Helm templating & values", "Kustomize"], fact: "Kustomize patches YAML without templates — it's built into kubectl." },
      { subject: "OPS", topics: ["Liveness, readiness & startup probes", "Self-healing"], fact: "A failing liveness probe makes Kubernetes restart the container for you." },
      { subject: "MIX", topics: ["Add HPA + probes", "Write a Helm chart", "Network policy lab", "Mock", "Notes"], fact: "Readiness probes keep traffic away from pods that aren't ready yet." },
      { subject: "MIX", topics: ["RBAC & service accounts", "Security context", "Weekly recap"], fact: "RBAC follows least privilege — grant only the verbs and resources needed." },
      { subject: "OPS", topics: ["Monitoring: Prometheus & Grafana", "Metrics & alerts"], fact: "Prometheus scrapes metrics on a pull model rather than receiving pushes." },
      { subject: "OPS", topics: ["Logging (EFK / Loki)", "Centralized logs"], fact: "Pod logs vanish when a pod dies — ship them somewhere durable." },
      { subject: "CORE", topics: ["Scheduling: node affinity & taints", "Pod affinity/anti-affinity"], fact: "Taints repel pods; only pods with a matching toleration can land there." },
      { subject: "OPS", topics: ["Rolling, blue-green & canary deploys", "Deployment strategies"], fact: "Canary releases send a small % of traffic to the new version first." },
      { subject: "OPS", topics: ["Cluster upgrades & node management", "Drain & cordon"], fact: "'kubectl drain' safely evicts pods before you take a node down." },
      { subject: "MIX", topics: ["Set up Prometheus + Grafana", "Do a canary deploy", "RBAC lab", "Mock", "Notes"], fact: "Grafana dashboards turn raw metrics into on-call-friendly graphs." },
      { subject: "MIX", topics: ["GitOps (ArgoCD/Flux) intro", "CI/CD to Kubernetes", "Weekly recap"], fact: "GitOps makes Git the single source of truth for cluster state." },
      { subject: "MIX", topics: ["CKA-style practice #1", "Troubleshooting scenarios"], fact: "The CKA exam is fully hands-on — speed with kubectl is everything." },
      { subject: "MIX", topics: ["CKA-style practice #2", "Cheat-sheet review"], fact: "Master 'kubectl get/describe/logs/exec' and you can debug almost anything. 🚢" },
    ],
  },

  // ======================= 7) JAVA + SPRING BOOT + ADVANCED PYTHON =======================
  {
    id: "java-spring-python", name: "Java + Spring + Python", emoji: "☕",
    tagline: "Java · Spring Boot · Advanced Python",
    subjects: { JAVA: { name: "Core Java", color: C.orange }, SPRING: { name: "Spring Boot", color: C.green }, JPA: { name: "Data / REST", color: C.teal }, PY: { name: "Advanced Python", color: C.blue }, MIX },
    days: [
      { subject: "JAVA", topics: ["JVM/JRE/JDK & Java basics recap", "OOP & collections framework"], fact: "The JVM's 'write once, run anywhere' promise dates back to 1995." },
      { subject: "SPRING", topics: ["Spring Boot intro & project setup", "IoC container, beans & DI"], fact: "Spring Boot's auto-configuration removed mountains of old XML config." },
      { subject: "PY", topics: ["Comprehensions & generators", "Iterators & itertools"], fact: "Generators produce values lazily — you can iterate an infinite sequence." },
      { subject: "JAVA", topics: ["Generics & the Streams API", "Lambdas & functional interfaces"], fact: "Java 8 (2014) added lambdas and streams — its biggest leap in a decade." },
      { subject: "SPRING", topics: ["REST controllers (@RestController)", "Request mapping, path & query params"], fact: "@RestController = @Controller + @ResponseBody in a single annotation." },
      { subject: "MIX", topics: ["Build a REST API with Spring Boot", "Python: decorators in depth", "Java streams practice", "Notes"], fact: "A Python decorator is just a function that wraps another function." },
      { subject: "MIX", topics: ["Python: context managers (with)", "Spring: bean scopes", "Weekly recap"], fact: "The 'with' statement guarantees cleanup even if an exception is thrown." },
      { subject: "JAVA", topics: ["Exceptions & Optional", "Records & sealed classes"], fact: "Optional was added to make 'no value' explicit and fight NullPointerException." },
      { subject: "JPA", topics: ["Spring Data JPA & repositories", "Entities & relationships"], fact: "Spring Data can generate a query just from a method's name." },
      { subject: "PY", topics: ["Decorators & closures", "functools (wraps, lru_cache)"], fact: "@lru_cache memoizes a function's results with a single line." },
      { subject: "JPA", topics: ["Service layer & @Transactional", "DTOs & mapping"], fact: "@Transactional rolls the whole method back if anything throws." },
      { subject: "JAVA", topics: ["Concurrency: threads & ExecutorService", "CompletableFuture"], fact: "CompletableFuture lets you chain async tasks without callback hell." },
      { subject: "MIX", topics: ["CRUD API with JPA + a database", "Python: metaclasses", "Java concurrency lab", "Mock", "Notes"], fact: "In Python, classes are objects too — metaclasses are 'classes of classes'." },
      { subject: "MIX", topics: ["Python: async/await & asyncio", "Spring: exception handling", "Weekly recap"], fact: "asyncio runs thousands of I/O tasks on a single thread via an event loop." },
      { subject: "JPA", topics: ["Validation & @ControllerAdvice", "Bean validation annotations"], fact: "@ControllerAdvice centralizes error handling across all controllers." },
      { subject: "PY", topics: ["asyncio in depth", "aiohttp & the event loop"], fact: "Async shines for I/O-bound work, not CPU-bound number crunching." },
      { subject: "SPRING", topics: ["Spring Security basics", "Authentication & JWT"], fact: "A JWT is self-contained — the server can verify it without a session store." },
      { subject: "JAVA", topics: ["Java memory model & garbage collection", "Basic profiling"], fact: "Modern GCs like G1 aim to keep pauses under a few milliseconds." },
      { subject: "PY", topics: ["Type hints & Pydantic", "dataclasses & typing"], fact: "Type hints don't affect runtime — but tools like mypy catch bugs early." },
      { subject: "MIX", topics: ["Secure your API with JWT", "Python: build an async scraper", "Spring Security lab", "Mock", "Notes"], fact: "Pydantic validates and parses data at the edges of your app automatically." },
      { subject: "MIX", topics: ["Python: threading vs multiprocessing (GIL)", "Spring: caching", "Weekly recap"], fact: "CPython's GIL means threads don't run Python bytecode in true parallel." },
      { subject: "SPRING", topics: ["Testing: JUnit & Mockito", "Integration tests"], fact: "Mockito fakes dependencies so you can test one unit in isolation." },
      { subject: "PY", topics: ["Dunder methods & descriptors", "Properties & __slots__"], fact: "__slots__ can cut per-instance memory by skipping the __dict__." },
      { subject: "SPRING", topics: ["Actuator, profiles & config", "Externalized configuration"], fact: "Actuator exposes ready-made health and metrics endpoints for free." },
      { subject: "JAVA", topics: ["Design patterns in Java", "Dependency injection in depth"], fact: "Spring itself is essentially a giant, powerful DI container." },
      { subject: "PY", topics: ["Performance: profiling & caching", "C extensions / Cython intro"], fact: "cProfile shows exactly where your Python program spends its time." },
      { subject: "MIX", topics: ["Write tests for your API", "Python: packaging (pip/poetry)", "Dockerize the Spring app", "Mock", "Notes"], fact: "Poetry manages dependencies and builds in one modern, lockfile-based tool." },
      { subject: "MIX", topics: ["Spring Boot + Docker + deploy", "Python: advanced pytest", "Weekly recap"], fact: "pytest fixtures make setup/teardown reusable and composable across tests." },
      { subject: "MIX", topics: ["Build a mini full project (Spring + Python service)", "Java interview questions"], fact: "Shipping one polished project teaches more than ten unfinished tutorials." },
      { subject: "MIX", topics: ["Python + Spring interview questions", "Cheat-sheet review"], fact: "Knowing when to reach for Java vs Python is itself a senior-level skill. 🚀" },
    ],
  },
];

const PLAN_BY_ID = Object.fromEntries(PLANS.map((p) => [p.id, p]));
const STORAGE_KEY = "progressTracker.v2";
const LEGACY_KEY = "progressTracker.v1";

function emptyPlanState() {
  return { checked: {}, notes: {}, lastActiveDate: null, streak: 0 };
}

// ---------------------------------------------------------------------------
// Store (all plans) + current-plan view
// ---------------------------------------------------------------------------
let store = { version: 2, activePlan: PLANS[0].id, plans: {} };

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      store.activePlan = PLAN_BY_ID[parsed.activePlan] ? parsed.activePlan : PLANS[0].id;
      store.plans = parsed.plans || {};
    } else {
      // Migrate old single-plan data into the CS Fundamentals plan.
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const p = JSON.parse(legacy);
        store.plans["cs-fundamentals"] = {
          checked: p.checked || {}, notes: p.notes || {},
          lastActiveDate: p.lastActiveDate || null, streak: p.streak || 0,
        };
      }
    }
  } catch (e) {
    console.warn("Could not load saved progress:", e);
  }
  // Ensure every plan has a state object.
  for (const p of PLANS) if (!store.plans[p.id]) store.plans[p.id] = emptyPlanState();
}

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn("Could not save progress:", e);
  }
}

function currentPlan() { return PLAN_BY_ID[store.activePlan]; }
function state() { return store.plans[store.activePlan]; }

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function todayStr() { return new Date().toISOString().slice(0, 10); }
function daysBetween(a, b) {
  return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
}

function markActivityToday() {
  const s = state();
  const today = todayStr();
  if (s.lastActiveDate === today) return;
  if (s.lastActiveDate && daysBetween(s.lastActiveDate, today) === 1) s.streak += 1;
  else s.streak = 1;
  s.lastActiveDate = today;
}

function anyCheckedToday() {
  return Object.values(state().checked).some(Boolean);
}

function computeProgress() {
  const plan = currentPlan();
  const s = state();
  const per = {};
  for (const key of Object.keys(plan.subjects)) per[key] = { done: 0, total: 0 };
  let done = 0, total = 0;
  plan.days.forEach((d, idx) => {
    const day = idx + 1;
    per[d.subject].total += d.topics.length;
    total += d.topics.length;
    d.topics.forEach((_, i) => {
      if (s.checked[`${day}-${i}`]) { per[d.subject].done += 1; done += 1; }
    });
  });
  return { done, total, per };
}

function pct(done, total) { return total === 0 ? 0 : Math.round((done / total) * 100); }

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function render() {
  renderTabs();
  renderDays();
  renderSummary();
}

function renderTabs() {
  const wrap = document.getElementById("plan-tabs");
  wrap.innerHTML = "";
  for (const p of PLANS) {
    const btn = document.createElement("button");
    btn.className = "plan-tab" + (p.id === store.activePlan ? " active" : "");
    const { done, total } = planProgress(p);
    btn.innerHTML = `<span class="tab-emoji">${p.emoji}</span>
      <span class="tab-name">${p.name}</span>
      <span class="tab-pct">${pct(done, total)}%</span>`;
    btn.addEventListener("click", () => switchPlan(p.id));
    wrap.appendChild(btn);
  }
  document.getElementById("plan-subtitle").textContent = currentPlan().tagline;
}

// lightweight progress for the tab labels (any plan)
function planProgress(plan) {
  const s = store.plans[plan.id] || emptyPlanState();
  let done = 0, total = 0;
  plan.days.forEach((d, idx) => {
    total += d.topics.length;
    d.topics.forEach((_, i) => { if (s.checked[`${idx + 1}-${i}`]) done += 1; });
  });
  return { done, total };
}

function renderDays() {
  const plan = currentPlan();
  const s = state();
  const container = document.getElementById("days");
  container.innerHTML = "";

  plan.days.forEach((d, idx) => {
    const day = idx + 1;
    const meta = dayMeta(day);
    const subj = plan.subjects[d.subject];
    const card = document.createElement("section");
    card.className = "day-card" + (meta.type === "weekend" ? " weekend" : "");
    card.style.setProperty("--subject-color", subj.color);

    const doneCount = d.topics.filter((_, i) => s.checked[`${day}-${i}`]).length;
    const header = document.createElement("div");
    header.className = "day-header";
    header.innerHTML = `
      <div class="day-title">
        <span class="day-num">Day ${day}</span>
        <span class="weekday">${meta.weekday}</span>
      </div>
      <div class="badges">
        <span class="subject-chip" style="background:${subj.color}">${subj.name}</span>
        <span class="hours-badge">${meta.type === "weekend" ? "5h" : "2h"}</span>
      </div>`;
    card.appendChild(header);

    const list = document.createElement("ul");
    list.className = "topics";
    d.topics.forEach((topic, i) => {
      const key = `${day}-${i}`;
      const id = `t-${plan.id}-${key}`;
      const checked = !!s.checked[key];
      const li = document.createElement("li");
      li.innerHTML = `
        <label class="topic ${checked ? "checked" : ""}" for="${id}">
          <input type="checkbox" id="${id}" ${checked ? "checked" : ""}>
          <span>${topic}</span>
        </label>`;
      li.querySelector("input").addEventListener("change", (e) => toggleTopic(day, i, e.target.checked));
      list.appendChild(li);
    });
    card.appendChild(list);

    const meter = document.createElement("div");
    meter.className = "day-progress";
    meter.textContent = `${doneCount}/${d.topics.length} done`;
    card.appendChild(meter);

    const fact = document.createElement("div");
    fact.className = "fact";
    fact.innerHTML = `<span class="fact-icon">💡</span> ${d.fact}`;
    card.appendChild(fact);

    const notesWrap = document.createElement("div");
    notesWrap.className = "notes";
    const ta = document.createElement("textarea");
    ta.placeholder = "Notes for the day…";
    ta.value = s.notes[day] || "";
    ta.addEventListener("input", (e) => saveNote(day, e.target.value));
    notesWrap.appendChild(ta);
    card.appendChild(notesWrap);

    container.appendChild(card);
  });
}

function renderSummary() {
  const plan = currentPlan();
  const s = state();
  const { done, total, per } = computeProgress();
  const overall = pct(done, total);

  document.getElementById("overall-pct").textContent = `${overall}%`;
  document.getElementById("overall-bar").style.width = `${overall}%`;
  document.getElementById("overall-count").textContent = `${done} / ${total} topics`;
  document.getElementById("streak").textContent = `🔥 ${s.streak} day${s.streak === 1 ? "" : "s"}`;

  const subjWrap = document.getElementById("subject-bars");
  subjWrap.innerHTML = "";
  for (const [key, subj] of Object.entries(plan.subjects)) {
    const p = pct(per[key].done, per[key].total);
    const row = document.createElement("div");
    row.className = "subject-row";
    row.innerHTML = `
      <span class="subject-label">${subj.name}</span>
      <div class="bar"><div class="bar-fill" style="width:${p}%;background:${subj.color}"></div></div>
      <span class="subject-pct">${p}%</span>`;
    subjWrap.appendChild(row);
  }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function switchPlan(id) {
  if (!PLAN_BY_ID[id] || id === store.activePlan) return;
  store.activePlan = id;
  saveStore();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTopic(day, i, isChecked) {
  const s = state();
  const key = `${day}-${i}`;
  if (isChecked) {
    s.checked[key] = true;
    markActivityToday();
  } else {
    delete s.checked[key];
    if (!anyCheckedToday()) { s.streak = 0; s.lastActiveDate = null; }
  }
  saveStore();
  render();
}

let noteTimer = null;
function saveNote(day, text) {
  const s = state();
  if (text.trim() === "") delete s.notes[day];
  else s.notes[day] = text;
  clearTimeout(noteTimer);
  noteTimer = setTimeout(saveStore, 300);
}

function resetAll() {
  const name = currentPlan().name;
  if (!confirm(`Reset progress & notes for "${name}"?\nOther plans are not affected.`)) return;
  store.plans[store.activePlan] = emptyPlanState();
  saveStore();
  render();
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `study-tracker-progress-${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data && typeof data === "object" && data.plans && typeof data.plans === "object") {
        // New multi-plan format
        store.plans = {};
        for (const p of PLANS) {
          const d = data.plans[p.id];
          store.plans[p.id] = d && typeof d === "object"
            ? { checked: d.checked || {}, notes: d.notes || {}, lastActiveDate: d.lastActiveDate || null, streak: d.streak || 0 }
            : emptyPlanState();
        }
        if (PLAN_BY_ID[data.activePlan]) store.activePlan = data.activePlan;
      } else if (data && typeof data.checked === "object") {
        // Legacy single-plan file → import into CS Fundamentals
        store.plans["cs-fundamentals"] = {
          checked: data.checked || {}, notes: data.notes || {},
          lastActiveDate: data.lastActiveDate || null, streak: data.streak || 0,
        };
        store.activePlan = "cs-fundamentals";
      } else {
        throw new Error("Unrecognized file format");
      }
      saveStore();
      render();
      alert("Progress imported successfully.");
    } catch (e) {
      alert("Could not import file: " + e.message);
    }
  };
  reader.readAsText(file);
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadStore();
  render();

  document.getElementById("reset-btn").addEventListener("click", resetAll);
  document.getElementById("export-btn").addEventListener("click", exportJSON);

  const importInput = document.getElementById("import-input");
  document.getElementById("import-btn").addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", (e) => {
    if (e.target.files[0]) importJSON(e.target.files[0]);
    e.target.value = "";
  });
});
