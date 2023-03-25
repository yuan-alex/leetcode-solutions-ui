import { globby } from "globby";
import { GetStaticProps } from "next";
import Head from "next/head";
import fs from "node:fs";
import process from "node:process";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface Solution {
  title: string;
  content: string;
}

export default function Solution(props: { solutions: Solution[] }) {
  const [solution, setSolution] = useState<any>(null);

  return (
    <div className="flex divide-y h-screen w-screen">
      <Head>
        <title>alex's leetcode solutions</title>
        <meta name="description" content="alex's leetcode solutions" />
      </Head>
      <div className="w-1/3 p-7 shrink-0 h-full overflow-y-auto">
        {props.solutions.map((solution) => (
          <div
            key={solution.title}
            className="text-xl cursor-pointer hover:text-gray-600"
            onClick={(e) => {
              e.preventDefault();
              setSolution(solution);
            }}
          >
            {solution.title}
          </div>
        ))}
      </div>
      <div className="p-7 flex-grow w-full overflow-x-auto">
        {solution ? (
          <>
            <h1 className="text-5xl mb-5">{solution.title}</h1>
            <SyntaxHighlighter language="python" showLineNumbers>
              {solution.content}
            </SyntaxHighlighter>
          </>
        ) : (
          <>
            <h1 className="text-5xl mb-5">alex's leetcode solutions</h1>
            <p className="text-3xl">
              This is a collection of my leetcode solutions from{" "}
              <a
                className="underline"
                href="https://github.com/yuan-alex/leetcode"
              >
                my repo
              </a>
              . It's an easier way to visualize which problems I've solved and
              how I solved them.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (context) => {
  const paths = await globby("leetcode/**/solution.py", {
    cwd: process.cwd(),
    onlyFiles: true,
  });

  paths.sort((a, b) => {
    const aNum = parseInt(a.split("/")[1]);
    const bNum = parseInt(b.split("/")[1]);
    return aNum - bNum;
  });

  const solutions = paths.map((path) => {
    const problem = path.split("/")[1];
    const file = path.split("/")[2];
    return {
      title: file ? `${problem} - ${file}` : problem,
      content: fs.readFileSync(path, "utf8"),
    };
  });

  return {
    // Passed to the page component as props
    props: {
      solutions,
    },
  };
};
