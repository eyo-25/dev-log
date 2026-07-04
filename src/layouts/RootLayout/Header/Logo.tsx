import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      {CONFIG.blog.title}
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  color: ${({ theme }) => theme.colors.gray12};
  font-size: 12px;
  font-weight: 500;
  line-height: 1;

  :hover {
    color: ${({ theme }) => theme.colors.gray11};
  }
`
