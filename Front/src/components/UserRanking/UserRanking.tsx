import firstPlace from "../../assets/images/firstPlace.jpg";
import secondPlace from "../../assets/images/secondPlace.png";
import thirdPlace from "../../assets/images/thirdPlace.png";
import UserRankingInterface from "../../interfaces/UserRankingInterface";

import {
  DivUser,
  Line,
  RankingImg,
  RankingName,
  RankingPoints,
  TriangleLeft,
  TriangleLeft2,
  TriangleRight,
  TriangleRight2,
} from "./CssUserRanking";
function UserRanking({ user, index }: UserRankingInterface) {
  return (
    <DivUser key={user.id}>
      <TriangleLeft></TriangleLeft>
      <TriangleLeft2></TriangleLeft2>
      <RankingName>{user.username}</RankingName>
      <RankingPoints>{user.points}</RankingPoints>
      <RankingImg
        style={index === 0 ? { display: "block" } : { display: "none" }}
        src={firstPlace}
        alt="premiere place"
      />
      <RankingImg
        style={index === 1 ? { display: "block" } : { display: "none" }}
        src={secondPlace}
        alt="deuxieme place"
      />
      <RankingImg
        style={index === 2 ? { display: "block" } : { display: "none" }}
        src={thirdPlace}
        alt="troisieme place"
      />
      <Line></Line>
      <TriangleRight></TriangleRight>
      <TriangleRight2></TriangleRight2>
    </DivUser>
  );
}

export default UserRanking;