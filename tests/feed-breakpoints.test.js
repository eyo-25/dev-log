const assert = require("assert")
const fs = require("fs")
const path = require("path")

const repoRoot = path.resolve(__dirname, "..")

function readSource(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8")
}

const feedSource = readSource("src/routes/Feed/index.tsx")
const postListSource = readSource("src/routes/Feed/PostList/index.tsx")
const pinnedPostsSource = readSource("src/routes/Feed/PostList/PinnedPosts.tsx")

const mobileShellBreakpoint = /@media \(max-width: 767px\)/
const postsGridBreakpoint = /@media \(min-width: 768px\)/
const mobileSingleColumnGrid = /grid-template-columns:\s*minmax\(0,\s*1fr\);/

assert(
  mobileShellBreakpoint.test(feedSource),
  "Feed mobile shell must end before the posts grid switches to two columns"
)

assert(
  postsGridBreakpoint.test(postListSource),
  "PostList should keep using the desktop grid at 768px and wider"
)

assert(
  mobileSingleColumnGrid.test(postListSource),
  "PostList mobile grid column must be shrinkable to the viewport"
)

assert(
  postsGridBreakpoint.test(pinnedPostsSource),
  "PinnedPosts should keep using the desktop grid at 768px and wider"
)

assert(
  mobileSingleColumnGrid.test(pinnedPostsSource),
  "PinnedPosts mobile grid column must be shrinkable to the viewport"
)
