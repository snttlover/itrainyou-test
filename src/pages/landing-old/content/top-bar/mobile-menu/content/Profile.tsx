import * as React from "react"
import styled from "styled-components"
// @ts-ignore
import profilePlaceholder from "@/pages/landing-old/content/top-bar/mobile-menu/images/profile-placeholder.png"

const ProfileContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 32px;
  text-align: center;

  @media screen and (max-width: 480px) {
    padding-top: 24px;
    padding-bottom: 15px;
  }
`

const ProfileImage = styled.img.attrs({ src: profilePlaceholder })`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 4px;
  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`

const ProfileDescription = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const UserName = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
`

const Age = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #b3b3b3;
`

const HideMobile = styled.div`
  @media screen and (max-width: 480px) {
    display: none;
  }
`

export const Profile = () => (
  <ProfileContainer>
    <ProfileImage />
    <ProfileDescription>
      <UserName>
        Константин Константинов
        <HideMobile>,</HideMobile>
      </UserName>
      <Age>24 года</Age>
    </ProfileDescription>
  </ProfileContainer>
)
