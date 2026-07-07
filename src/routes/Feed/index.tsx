import { FeedHeader } from "./FeedHeader"
import Footer from "./Footer"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import SearchInput from "./SearchInput"
import MobileProfileCard from "./MobileProfileCard"
import ProfileCard from "./ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"

const HEADER_HEIGHT = 73

type Props = {}

const Feed: React.FC<Props> = () => {
  const router = useRouter()
  const q = typeof router.query.q === "string" ? router.query.q : ""

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const nextQuery = { ...router.query }

    if (value) {
      nextQuery.q = value
    } else {
      delete nextQuery.q
    }

    router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  return (
    <StyledWrapper>
      <div className="mid">
        <MobileProfileCard />
        <SearchInput value={q} onChange={handleSearch} />
        <FeedHeader />
        <PinnedPosts q={q} />
        <PostList q={q} />
        <div className="footer">
          <Footer />
        </div>
      </div>
      <div
        className="rt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <ProfileCard />
        <ServiceCard />
        <ContactCard />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  grid-template-columns: repeat(12, minmax(0, 1fr));

  padding: 2rem 0;
  display: grid;
  gap: 1.5rem;

  @media (max-width: 767px) {
    display: block;
    padding: 0.5rem 0;
  }

  > .mid {
    grid-column: span 12 / span 12;

    @media (min-width: 1024px) {
      grid-column: span 9 / span 9;
    }

    > .footer {
      padding-bottom: 2rem;
      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  > .rt {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    display: none;
    overflow: scroll;
    position: sticky;
    top: ${HEADER_HEIGHT - 10}px;

    @media (min-width: 1024px) {
      display: block;
      grid-column: span 3 / span 3;
    }

    .footer {
      padding-top: 1rem;
    }
  }
`
