interface Post {
  id: string;
  title: string;
  content: string; // HTML markup content
  author: string;
  date: string;
}

const dummyData: Post[] = [
  {
    id: "1",
    title: "Getting Started with TypeScript",
    author: "John Doe",
    date: "2025-05-01",
    content: `
      <p><strong>TypeScript</strong> is a superset of JavaScript that adds <em>static typing</em>.</p>
      <ul>
        <li>Easy to adopt</li>
        <li>Helps catch errors early</li>
        <li>Great for large codebases</li>
      </ul>
    `,
  },
  {
    id: "2",
    title: "Daily Coding Checklist",
    author: "Jane Smith",
    date: "2025-05-02",
    content: `
      <p>Before you start coding, make sure you:</p>
      <ol>
        <li><strong>Plan</strong> your solution</li>
        <li>Write <em>clean</em> and readable code</li>
        <li>Test your edge cases</li>
      </ol>
    `,
  },
  {
    id: "3",
    title: "Top Features in React 18",
    author: "Naman",
    date: "2025-05-03",
    content: `
      <p>React 18 introduced several exciting features:</p>
      <ul>
        <li><strong>Concurrent Rendering</strong> for smoother UX</li>
        <li><em>Automatic Batching</em> of updates</li>
        <li>Start <strong>Transition APIs</strong></li>
      </ul>
      <p><em>Upgrade now</em> to leverage the best of React!</p>
    `,
  },
  {
    id: "4",
    title: "My Web Dev Stack",
    author: "Dev Guru",
    date: "2025-05-04",
    content: `
      <p>I use the following stack for full-stack development:</p>
      <ul>
        <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React</li>
        <li><strong>Backend:</strong> Node.js, Express</li>
        <li><strong>Database:</strong> MongoDB</li>
      </ul>
      <p><strong>Total control</strong> over the stack means <em>faster</em> delivery!</p>
    `,
  },
  {
    id: "5",
    title: "Best Practices for Writing Clean Code",
    author: "Alice Cooper",
    date: "2025-05-05",
    content: `
      <p>Clean code is:</p>
      <ul>
        <li><strong>Readable</strong> and <em>understandable</em></li>
        <li>Modular and reusable</li>
        <li>Well-documented</li>
      </ul>
      <p>Always <em>refactor</em> and <strong>review</strong> your code!</p>
    `,
  },
];

export default dummyData;
