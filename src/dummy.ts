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
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
    `,
  },
  {
    id: "2",
    title: "Daily Coding Checklist",
    author: "Jane Smith",
    date: "2025-05-02",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
    `,
  },
  {
    id: "3",
    title: "Top Features in React 18",
    author: "Naman",
    date: "2025-05-03",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
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
   {
    id: "1",
    title: "Getting Started with TypeScript",
    author: "John Doe",
    date: "2025-05-01",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
    `,
  },
  {
    id: "2",
    title: "Daily Coding Checklist",
    author: "Jane Smith",
    date: "2025-05-02",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
    `,
  },
  {
    id: "3",
    title: "Top Features in React 18",
    author: "Naman",
    date: "2025-05-03",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
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
  }, {
    id: "1",
    title: "Getting Started with TypeScript",
    author: "John Doe",
    date: "2025-05-01",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
    `,
  },
  {
    id: "2",
    title: "Daily Coding Checklist",
    author: "Jane Smith",
    date: "2025-05-02",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
    `,
  },
  {
    id: "3",
    title: "Top Features in React 18",
    author: "Naman",
    date: "2025-05-03",
    content: `
     <p>Hello , My name is Bhaiya,</p><p></p><p>l</p><p>Iska kuch na kuch to hoi jaiga,</p><p>i love my body, apke liye kuch karlenge</p><p></p><p></p><ul><li><p>khilaege hamni</p></li><li><p>ggaegebhi hamhi </p></li><li><p>okok</p></li></ul><p><u>Hello is my body </u></p><p></p><p><mark>Highlisght is my sty</mark></p>
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
