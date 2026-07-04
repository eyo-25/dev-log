import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper href={`/Post/${data.slug}`}>
      <article>
        {data.thumbnail && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              sizes="(min-width: 1024px) 360px, (min-width: 768px) calc((100vw - 4.5rem) / 2), calc(100vw - 3rem)"
              css={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div data-thumb={!!data.thumbnail} className="content">
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          <div className="date">
            <div className="content">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: block;
  height: 100%;

  article {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: ${({ theme }) =>
      theme.scheme === "light"
        ? "0 2px 8px rgba(0, 0, 0, 0.04), 0 14px 30px rgba(0, 0, 0, 0.06)"
        : "0 2px 8px rgba(0, 0, 0, 0.18), 0 14px 30px rgba(0, 0, 0, 0.16)"};
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    :hover {
      box-shadow: ${({ theme }) =>
        theme.scheme === "light"
          ? "0 4px 12px rgba(0, 0, 0, 0.06), 0 18px 36px rgba(0, 0, 0, 0.08)"
          : "0 4px 12px rgba(0, 0, 0, 0.22), 0 18px 36px rgba(0, 0, 0, 0.2)"};

      > .content {
        background-color: ${({ theme }) =>
          theme.scheme === "light" ? theme.colors.gray3 : theme.colors.gray5};
      }
    }

    > .thumbnail {
      position: relative;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
      width: 100%;
      aspect-ratio: 17 / 10;
      background-color: ${({ theme }) => theme.colors.gray2};
    }
    > .content {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 1rem;
      transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);

      &[data-thumb="false"] {
        padding-top: 1rem;
      }
      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }
        h2 {
          margin-bottom: 0.5rem;
          font-size: 19px;
          line-height: 1.75rem;
          font-weight: 600;

          cursor: pointer;
        }
      }
      > .date {
        display: flex;
        margin-bottom: 1rem;
        gap: 0.5rem;
        align-items: center;
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          @media (min-width: 768px) {
            margin-left: 0;
          }
        }
      }
      > .summary {
        margin: 0;
        p {
          display: -webkit-box;
          overflow: hidden;
          margin: 0;
          margin-bottom: 15px;
          min-height: 6rem;
          max-height: 6rem;
          line-height: 1.5rem;
          color: ${({ theme }) => theme.colors.gray11};
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
      > .tags {
        display: flex;
        margin-top: auto;
        gap: 0.5rem;
      }
    }
  }
`
