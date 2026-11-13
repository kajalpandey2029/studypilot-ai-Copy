import {
  UserProfile,
  UserPreferences,
  Subject,
  Topic,
  StudySession,
  Conversation,
  ChatMessage,
  DocumentItem,
  Quiz,
  Question,
  QuizAttempt,
  FlashcardDeck,
  Flashcard,
  StudyTask,
  StudyMode,
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  CodingProblem,
} from '@/types';

// Default initial user profile
const INITIAL_PROFILE: UserProfile = {
  id: 'usr_default_pilot',
  email: 'student@studypilot.ai',
  full_name: 'Alex Chen',
  avatar_url: '',
  education_level: 'university',
  institution: 'University of Technology',
  degree: 'B.S. Computer Science & AI',
  academic_year: '3rd Year',
  preferred_learning_style: 'visual_practical',
  daily_study_goal_minutes: 90,
  current_streak_days: 7,
  longest_streak_days: 14,
  total_study_minutes: 1840,
  created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
};

const INITIAL_PREFERENCES: UserPreferences = {
  user_id: 'usr_default_pilot',
  theme: 'dark',
  spatial_effects_enabled: true,
  sound_effects_enabled: false,
  preferred_ai_model: 'gemini-1.5-flash',
  default_tutor_persona: 'friendly_teacher',
  email_notifications: true,
  study_reminders: true,
};

const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'subj_1',
    user_id: 'usr_default_pilot',
    name: 'Data Structures & Algorithms',
    code: 'CS 201',
    description: 'Foundations of algorithmic complexity, tree structures, and graph theory',
    color_hex: '#8B5CF6',
    target_exam_date: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
    mastery_percentage: 78,
    topics_count: 8,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'subj_2',
    user_id: 'usr_default_pilot',
    name: 'Operating Systems & Concurrency',
    code: 'CS 304',
    description: 'Kernel architectures, memory paging, synchronization, and process scheduling',
    color_hex: '#06B6D4',
    target_exam_date: new Date(Date.now() + 40 * 86400000).toISOString().split('T')[0],
    mastery_percentage: 64,
    topics_count: 6,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: 'subj_3',
    user_id: 'usr_default_pilot',
    name: 'Machine Learning & Neural Systems',
    code: 'AI 402',
    description: 'Gradient optimization, deep representations, transformer attention, and backpropagation',
    color_hex: '#EC4899',
    target_exam_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    mastery_percentage: 82,
    topics_count: 10,
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
  {
    id: 'subj_4',
    user_id: 'usr_default_pilot',
    name: 'Distributed Database Architecture',
    code: 'DB 320',
    description: 'Consensus protocols, Raft, Paxos, ACID isolation levels, and sharding',
    color_hex: '#10B981',
    target_exam_date: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
    mastery_percentage: 52,
    topics_count: 5,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

const INITIAL_TOPICS: Topic[] = [
  {
    id: 'top_1',
    subject_id: 'subj_1',
    user_id: 'usr_default_pilot',
    title: 'Balanced Binary Search Trees (AVL & Red-Black)',
    description: 'Rotations, height bounds, and rebalancing guarantees',
    difficulty: 'hard',
    mastery_score: 58,
    is_weak_topic: true,
    needs_revision: true,
    last_studied_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
  },
  {
    id: 'top_2',
    subject_id: 'subj_1',
    user_id: 'usr_default_pilot',
    title: 'Dynamic Programming & Memoization',
    description: 'Optimal substructure and overlapping subproblems',
    difficulty: 'hard',
    mastery_score: 84,
    is_weak_topic: false,
    needs_revision: false,
    last_studied_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 16 * 86400000).toISOString(),
  },
  {
    id: 'top_3',
    subject_id: 'subj_2',
    user_id: 'usr_default_pilot',
    title: 'Deadlock Detection & Banker Algorithm',
    description: 'Resource allocation graphs and safety state validation',
    difficulty: 'medium',
    mastery_score: 45,
    is_weak_topic: true,
    needs_revision: true,
    last_studied_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: 'top_4',
    subject_id: 'subj_3',
    user_id: 'usr_default_pilot',
    title: 'Scaled Dot-Product Self-Attention',
    description: 'Query, Key, Value matrix projections and softmax normalization',
    difficulty: 'hard',
    mastery_score: 91,
    is_weak_topic: false,
    needs_revision: false,
    last_studied_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 22 * 86400000).toISOString(),
  },
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc_1',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_1',
    title: 'Lecture 08: Tree Balancing & Graph Traversal Protocols',
    file_name: 'Lecture_08_Trees_Graphs.pdf',
    file_size_bytes: 2450000,
    file_type: 'pdf',
    page_count: 24,
    summary: 'Detailed formal analysis of AVL self-balancing invariants, double-rotation mechanics, Dijkstra shortest path proofs, and topological sort orders.',
    key_concepts: ['AVL Rotation', 'Red-Black Properties', 'Dijkstra Priority Queue', 'DAG Topological Sort'],
    status: 'processed',
    content_text: `Chapter 1: Self-Balancing Binary Trees. A binary search tree is strictly balanced when the height difference between left and right subtrees (the balance factor) never exceeds 1. When an insertion causes the balance factor to become 2 or -2, a single or double rotation restores the invariant in O(1) pointer updates. Chapter 2: Graph Traversals. Breadth-First Search (BFS) computes minimum-edge paths using a FIFO queue. Depth-First Search (DFS) discovers articulation points and cycles using recursion or an explicit LIFO stack.`,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'doc_2',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_3',
    title: 'Foundations of Deep Transformer Attention Mechanisms',
    file_name: 'Transformer_Attention_Foundations.pdf',
    file_size_bytes: 1820000,
    file_type: 'pdf',
    page_count: 18,
    summary: 'Mathematical formulation of multi-head self-attention, positional encoding embeddings, layer normalization, and residual connections in neural architectures.',
    key_concepts: ['Self-Attention Softmax', 'Multi-Head Projection', 'Sinusoidal Positional Encoding', 'Residual Skip Connection'],
    status: 'processed',
    content_text: `Section 1: Multi-Head Attention. Attention allows models to jointly attend to information from different representation subspaces at different positions. Multi-head attention projects Queries, Keys, and Values h times with different learned linear projections to dk, dk and dv dimensions respectively. Section 2: Positional Encodings. Because the model contains no recurrence and no convolution, order information must be injected via sinusoidal or learned positional embeddings.`,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
];

const INITIAL_DECKS: FlashcardDeck[] = [
  {
    id: 'deck_1',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_1',
    subject_name: 'Data Structures & Algorithms',
    title: 'High-Yield Tree Algorithms & Invariants',
    description: 'Essential flashcards for upcoming midterm: rotations, heights, and complexities.',
    cards_count: 6,
    cards_due_count: 3,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'deck_2',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_3',
    subject_name: 'Machine Learning',
    title: 'Neural Networks & Optimization Equations',
    description: 'Loss functions, optimizers, learning rate decay, and backprop derivatives.',
    cards_count: 5,
    cards_due_count: 2,
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
];

const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc_1',
    deck_id: 'deck_1',
    user_id: 'usr_default_pilot',
    front: 'What is the balance factor in an AVL tree, and what range is permissible?',
    back: 'Balance Factor = Height(Left Subtree) - Height(Right Subtree).\nPermissible values are {-1, 0, +1}. Any node reaching +2 or -2 triggers an immediate rotation.',
    difficulty: 'medium',
    is_favorite: true,
    repetition_interval_days: 3,
    ease_factor: 2.5,
    repetitions_count: 2,
    next_review_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 'fc_2',
    deck_id: 'deck_1',
    user_id: 'usr_default_pilot',
    front: 'When is a Left-Right (LR) double rotation required in an AVL tree?',
    back: 'When a node has a balance factor of +2 (left-heavy), and its left child has a balance factor of -1 (right-heavy). We perform a left rotation on the child, followed by a right rotation on the parent.',
    difficulty: 'hard',
    is_favorite: true,
    repetition_interval_days: 1,
    ease_factor: 2.3,
    repetitions_count: 1,
    next_review_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 'fc_3',
    deck_id: 'deck_1',
    user_id: 'usr_default_pilot',
    front: 'What is the space complexity of an in-order iterative traversal using an explicit stack?',
    back: 'O(h) where h is the tree height. In a balanced BST, h = O(log n); in a degenerate skewed tree, h = O(n).',
    difficulty: 'easy',
    is_favorite: false,
    repetition_interval_days: 6,
    ease_factor: 2.6,
    repetitions_count: 3,
    next_review_at: new Date(Date.now() + 4 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

const INITIAL_TASKS: StudyTask[] = [
  {
    id: 'tsk_1',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_1',
    subject_name: 'Data Structures & Algorithms',
    title: 'Master AVL double rotation edge cases',
    description: 'Solve 3 practice problems and review lecture slides 14-19',
    priority: 'urgent',
    due_date: new Date().toISOString().split('T')[0],
    estimated_minutes: 45,
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'tsk_2',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_2',
    subject_name: 'Operating Systems',
    title: 'Simulate Banker Algorithm safety condition',
    description: 'Work through safety state allocation matrix with 4 resources',
    priority: 'high',
    due_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    estimated_minutes: 60,
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'tsk_3',
    user_id: 'usr_default_pilot',
    subject_id: 'subj_3',
    subject_name: 'Machine Learning',
    title: 'Complete 10-question Transformer self-attention mock quiz',
    description: 'Validate understanding of scaling factor sqrt(d_k)',
    priority: 'medium',
    due_date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    estimated_minutes: 30,
    is_completed: true,
    completed_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_KNOWLEDGE_NODES: KnowledgeGraphNode[] = [
  { id: 'node_1', label: 'Algorithmic Complexity', category: 'concept', mastery_level: 95, subject_name: 'Data Structures', x: 200, y: 150 },
  { id: 'node_2', label: 'Binary Search Trees', category: 'topic', mastery_level: 80, subject_name: 'Data Structures', x: 400, y: 120 },
  { id: 'node_3', label: 'AVL Self-Balancing', category: 'topic', mastery_level: 58, subject_name: 'Data Structures', x: 620, y: 120 },
  { id: 'node_4', label: 'Red-Black Invariants', category: 'concept', mastery_level: 50, subject_name: 'Data Structures', x: 620, y: 220 },
  { id: 'node_5', label: 'Graph Representations', category: 'topic', mastery_level: 88, subject_name: 'Data Structures', x: 380, y: 320 },
  { id: 'node_6', label: 'Shortest Path (Dijkstra)', category: 'concept', mastery_level: 76, subject_name: 'Data Structures', x: 580, y: 350 },
];

const INITIAL_KNOWLEDGE_EDGES: KnowledgeGraphEdge[] = [
  { id: 'edge_1', source: 'node_1', target: 'node_2', relationship: 'prerequisite_of' },
  { id: 'edge_2', source: 'node_2', target: 'node_3', relationship: 'prerequisite_of' },
  { id: 'edge_3', source: 'node_2', target: 'node_4', relationship: 'related_to' },
  { id: 'edge_4', source: 'node_1', target: 'node_5', relationship: 'prerequisite_of' },
  { id: 'edge_5', source: 'node_5', target: 'node_6', relationship: 'prerequisite_of' },
];

const INITIAL_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob_1',
    title: 'Validate Binary Search Tree Invariant',
    difficulty: 'medium',
    language: 'python',
    category: 'Trees & Recursion',
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    starter_code: {
      python: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef isValidBST(root: TreeNode) -> bool:\n    # Implement your solution with optimal bounds check\n    def validate(node, low=float('-inf'), high=float('inf')):\n        if not node:\n            return True\n        if not (low < node.val < high):\n            return False\n        return validate(node.left, low, node.val) and validate(node.right, node.val, high)\n    \n    return validate(root)`,
      javascript: `function isValidBST(root) {\n  function validate(node, min = -Infinity, max = Infinity) {\n    if (!node) return true;\n    if (node.val <= min || node.val >= max) return false;\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n  }\n  return validate(root);\n}`,
      cpp: `struct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nbool validate(TreeNode* root, long min_val, long max_val) {\n    if (!root) return true;\n    if (root->val <= min_val || root->val >= max_val) return false;\n    return validate(root->left, min_val, root->val) && validate(root->right, root->val, max_val);\n}\n\nbool isValidBST(TreeNode* root) {\n    return validate(root, LONG_MIN, LONG_MAX);\n}`,
      c: `// C implementation with range pointers\n#include <stdbool.h>\n#include <limits.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\nbool validate(struct TreeNode* root, long min_val, long max_val) {\n    if (!root) return true;\n    if (root->val <= min_val || root->val >= max_val) return false;\n    return validate(root->left, min_val, root->val) && validate(root->right, root->val, max_val);\n}\n\nbool isValidBST(struct TreeNode* root) {\n    return validate(root, LONG_MIN, LONG_MAX);\n}`,
      java: `public class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n    \n    private boolean validate(TreeNode node, Integer min, Integer max) {\n        if (node == null) return true;\n        if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;\n        return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n    }\n}`,
    },
    test_cases: [
      { input: '[2, 1, 3]', expected_output: 'true', explanation: 'Root is 2, left is 1, right is 3. Satisfies all BST rules.' },
      { input: '[5, 1, 4, null, null, 3, 6]', expected_output: 'false', explanation: 'Root is 5, right child is 4 which is less than 5.' },
    ],
    constraints: ['Node count in tree is in range [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    hints: [
      'Think about passing down permissible minimum and maximum bounds during recursive traversal.',
      'Checking only local left < root < right is insufficient; subtrees must adhere to all ancestral bounds.',
    ],
  },
  {
    id: 'prob_2',
    title: 'Two Sum Pointer Optimization',
    difficulty: 'easy',
    language: 'python',
    category: 'Arrays & Two Pointers',
    description: `Given a 1-indexed sorted array of integers numbers, find two numbers such that they add up to a specific target number. Return indices of the two numbers.`,
    starter_code: {
      python: `def twoSum(numbers: list[int], target: int) -> list[int]:\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        current_sum = numbers[left] + numbers[right]\n        if current_sum == target:\n            return [left + 1, right + 1]\n        elif current_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []`,
      javascript: `function twoSum(numbers, target) {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}`,
      cpp: `vector<int> twoSum(vector<int>& numbers, int target) {\n    int l = 0, r = numbers.size() - 1;\n    while (l < r) {\n        int sum = numbers[l] + numbers[r];\n        if (sum == target) return {l + 1, r + 1};\n        if (sum < target) l++;\n        else r--;\n    }\n    return {};\n}`,
      c: `// Standard two pointer approach in C\nint* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {\n    int l = 0, r = numbersSize - 1;\n    int* res = (int*)malloc(2 * sizeof(int));\n    *returnSize = 2;\n    while (l < r) {\n        int sum = numbers[l] + numbers[r];\n        if (sum == target) { res[0] = l + 1; res[1] = r + 1; return res; }\n        if (sum < target) l++; else r--;\n    }\n    *returnSize = 0;\n    return NULL;\n}`,
      java: `public class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int l = 0, r = numbers.length - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return new int[]{l + 1, r + 1};\n            if (sum < target) l++; else r--;\n        }\n        return new int[0];\n    }\n}`,
    },
    test_cases: [
      { input: 'numbers = [2, 7, 11, 15], target = 9', expected_output: '[1, 2]', explanation: '2 + 7 = 9. Indices are 1 and 2.' },
    ],
    constraints: ['2 <= numbers.length <= 3 * 10^4', 'Array is sorted in non-decreasing order'],
    hints: ['Since array is already sorted, use two pointers converging from both boundaries.'],
  },
];

// In-Memory store fallback with indexed O(1) caching
class DataStore {
  private profile: UserProfile = INITIAL_PROFILE;
  private preferences: UserPreferences = INITIAL_PREFERENCES;
  private subjects: Subject[] = INITIAL_SUBJECTS;
  private topics: Topic[] = INITIAL_TOPICS;
  private documents: DocumentItem[] = INITIAL_DOCUMENTS;
  private decks: FlashcardDeck[] = INITIAL_DECKS;
  private flashcards: Flashcard[] = INITIAL_FLASHCARDS;
  private tasks: StudyTask[] = INITIAL_TASKS;
  private knowledgeNodes: KnowledgeGraphNode[] = INITIAL_KNOWLEDGE_NODES;
  private knowledgeEdges: KnowledgeGraphEdge[] = INITIAL_KNOWLEDGE_EDGES;
  private codingProblems: CodingProblem[] = INITIAL_CODING_PROBLEMS;
  private sessions: StudySession[] = [];
  private quizzes: Quiz[] = [];
  private attempts: QuizAttempt[] = [];

  // Indexed Lookup Caches
  private subjectsMap = new Map<string, Subject>();
  private documentsMap = new Map<string, DocumentItem>();
  private topicsBySubject = new Map<string, Topic[]>();
  private flashcardsByDeck = new Map<string, Flashcard[]>();
  private weakTopicsCache: Topic[] | null = null;

  constructor() {
    this.rebuildIndexes();
  }

  private rebuildIndexes(): void {
    this.subjectsMap.clear();
    this.subjects.forEach((s) => this.subjectsMap.set(s.id, s));

    this.documentsMap.clear();
    this.documents.forEach((d) => this.documentsMap.set(d.id, d));

    this.topicsBySubject.clear();
    this.topics.forEach((t) => {
      const list = this.topicsBySubject.get(t.subject_id) || [];
      list.push(t);
      this.topicsBySubject.set(t.subject_id, list);
    });

    this.flashcardsByDeck.clear();
    this.flashcards.forEach((f) => {
      const list = this.flashcardsByDeck.get(f.deck_id) || [];
      list.push(f);
      this.flashcardsByDeck.set(f.deck_id, list);
    });

    this.weakTopicsCache = null;
  }
  private conversations: Conversation[] = [
    {
      id: 'conv_1',
      user_id: 'usr_default_pilot',
      title: 'AVL Tree Invariants & Rotation Mechanics',
      mode: 'intermediate',
      created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
      updated_at: new Date(Date.now() - 3600000).toISOString(),
      last_message: 'Remember that single rotations solve linear unbalance (LL and RR), while double rotations solve zigzag patterns (LR and RL).',
    },
  ];
  private messages: Record<string, ChatMessage[]> = {
    conv_1: [
      {
        id: 'msg_1',
        conversation_id: 'conv_1',
        user_id: 'usr_default_pilot',
        role: 'user',
        content: 'Can you clearly explain when an AVL tree performs a Left-Right double rotation instead of a single rotation?',
        created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
      },
      {
        id: 'msg_2',
        conversation_id: 'conv_1',
        user_id: 'usr_default_pilot',
        role: 'assistant',
        content: `### AVL Left-Right (LR) Double Rotation Explained

An AVL tree performs a **Left-Right (LR) double rotation** when a subtree violation exhibits a *zigzag* shape:

1. **The Root Violation:** The parent node has a balance factor of **+2** (its left subtree is 2 levels taller than its right).
2. **The Child Violation:** Its left child has a balance factor of **-1** (the child itself is right-heavy).

#### Why a Single Right Rotation Fails Here
If you attempt a single right rotation directly on the parent, the right-heavy child becomes the new root, but its tall right grandchild is merely transferred to the parent's left side, preserving the height unbalance.

#### The Two-Step Resolution
- **Step 1 (Left Rotation on Child):** Straightens the zigzag into a uniform linear left-heavy line (LL).
- **Step 2 (Right Rotation on Parent):** Lifts the balanced grandchild to become the new local root. Both subtrees now have identical heights.`,
        created_at: new Date(Date.now() - 2 * 3600000 + 4000).toISOString(),
      },
    ],
  };

  // Profile & Preferences
  getProfile(): UserProfile { return this.profile; }
  updateProfile(updates: Partial<UserProfile>): UserProfile {
    this.profile = { ...this.profile, ...updates };
    return this.profile;
  }
  getPreferences(): UserPreferences { return this.preferences; }
  updatePreferences(updates: Partial<UserPreferences>): UserPreferences {
    this.preferences = { ...this.preferences, ...updates };
    return this.preferences;
  }

  // Subjects & Topics (Indexed O(1))
  getSubjects(): Subject[] { return this.subjects; }
  getSubject(id: string): Subject | undefined { return this.subjectsMap.get(id); }
  createSubject(subject: Omit<Subject, 'id' | 'created_at'>): Subject {
    const newSubject: Subject = {
      ...subject,
      id: `subj_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.subjects.push(newSubject);
    this.subjectsMap.set(newSubject.id, newSubject);
    return newSubject;
  }
  getTopics(subjectId?: string): Topic[] {
    return subjectId ? (this.topicsBySubject.get(subjectId) || []) : this.topics;
  }
  getWeakTopics(): Topic[] {
    if (!this.weakTopicsCache) {
      this.weakTopicsCache = this.topics.filter((t) => t.is_weak_topic || t.mastery_score < 60);
    }
    return this.weakTopicsCache;
  }

  // Documents (Indexed O(1))
  getDocuments(): DocumentItem[] { return this.documents; }
  getDocument(id: string): DocumentItem | undefined { return this.documentsMap.get(id); }
  addDocument(doc: Omit<DocumentItem, 'id' | 'created_at'>): DocumentItem {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.documents.unshift(newDoc);
    this.documentsMap.set(newDoc.id, newDoc);
    return newDoc;
  }

  // Flashcards & Decks (Indexed O(1))
  getDecks(): FlashcardDeck[] { return this.decks; }
  getDeck(id: string): FlashcardDeck | undefined { return this.decks.find((d) => d.id === id); }
  getFlashcards(deckId?: string): Flashcard[] {
    return deckId ? (this.flashcardsByDeck.get(deckId) || []) : this.flashcards;
  }
  updateFlashcard(id: string, updates: Partial<Flashcard>): Flashcard | undefined {
    const index = this.flashcards.findIndex((f) => f.id === id);
    if (index === -1) return undefined;
    this.flashcards[index] = { ...this.flashcards[index], ...updates };
    // Refresh deck index
    const deckId = this.flashcards[index].deck_id;
    this.flashcardsByDeck.set(
      deckId,
      this.flashcards.filter((f) => f.deck_id === deckId)
    );
    return this.flashcards[index];
  }
  createFlashcard(card: Omit<Flashcard, 'id' | 'created_at'>): Flashcard {
    const newCard: Flashcard = {
      ...card,
      id: `fc_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.flashcards.push(newCard);
    const list = this.flashcardsByDeck.get(card.deck_id) || [];
    list.push(newCard);
    this.flashcardsByDeck.set(card.deck_id, list);

    // increment deck count
    const deck = this.decks.find((d) => d.id === card.deck_id);
    if (deck) deck.cards_count += 1;
    return newCard;
  }

  // Study Tasks & Planner
  getTasks(): StudyTask[] { return this.tasks; }
  toggleTask(id: string): StudyTask | undefined {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.is_completed = !task.is_completed;
      task.completed_at = task.is_completed ? new Date().toISOString() : undefined;
    }
    return task;
  }
  addTask(task: Omit<StudyTask, 'id' | 'created_at'>): StudyTask {
    const newTask: StudyTask = {
      ...task,
      id: `tsk_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.tasks.unshift(newTask);
    return newTask;
  }

  // Knowledge Graph
  getKnowledgeGraph(): { nodes: KnowledgeGraphNode[]; edges: KnowledgeGraphEdge[] } {
    return { nodes: this.knowledgeNodes, edges: this.knowledgeEdges };
  }

  // Coding Problems
  getCodingProblems(): CodingProblem[] { return this.codingProblems; }
  getCodingProblem(id: string): CodingProblem | undefined {
    return this.codingProblems.find((p) => p.id === id);
  }

  // Conversations & Chat
  getConversations(): Conversation[] { return this.conversations; }
  getConversation(id: string): Conversation | undefined {
    return this.conversations.find((c) => c.id === id);
  }
  createConversation(title: string, mode: StudyMode, tutorPersona?: any): Conversation {
    const conv: Conversation = {
      id: `conv_${Date.now()}`,
      user_id: this.profile.id,
      title,
      mode,
      tutor_persona: tutorPersona,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.conversations.unshift(conv);
    this.messages[conv.id] = [];
    return conv;
  }
  getMessages(conversationId: string): ChatMessage[] {
    return this.messages[conversationId] || [];
  }
  addMessage(conversationId: string, role: 'user' | 'assistant' | 'system', content: string): ChatMessage {
    const msg: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      conversation_id: conversationId,
      user_id: this.profile.id,
      role,
      content,
      created_at: new Date().toISOString(),
    };
    if (!this.messages[conversationId]) {
      this.messages[conversationId] = [];
    }
    this.messages[conversationId].push(msg);

    // Update conversation last message
    const conv = this.conversations.find((c) => c.id === conversationId);
    if (conv) {
      conv.updated_at = new Date().toISOString();
      conv.last_message = content.slice(0, 100);
    }
    return msg;
  }

  // Quizzes & Attempts
  getQuizzes(): Quiz[] { return this.quizzes; }
  saveQuiz(quiz: Quiz): Quiz {
    this.quizzes.unshift(quiz);
    return quiz;
  }
  getQuiz(id: string): Quiz | undefined { return this.quizzes.find((q) => q.id === id); }
  saveQuizAttempt(attempt: QuizAttempt): QuizAttempt {
    this.attempts.unshift(attempt);
    // update profile streak and study minutes
    this.profile.total_study_minutes += Math.round(attempt.time_spent_seconds / 60) || 5;
    return attempt;
  }
  getQuizAttempts(): QuizAttempt[] { return this.attempts; }
}

export const dataStore = new DataStore();
