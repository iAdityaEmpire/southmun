import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout, Main } from "../components/layout";

export default function ConferencesPage({
	data,
}: {
	data: {
		smunc: FluidImage;
		gmunc: FluidImage;
		dmunc: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"Conferences"}>
			<Header
				backgroundImage={"/images/headers/conferences.jpg"}
				title={"Conferences"}
			>
				Where the fun takes place. Anim aute id magna aliqua ad ad non
				deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
				amet fugiat veniam occaecat fugiat aliqua.
			</Header>
			<Main>
				{/*TODO: images*/}
				{[
					{
						name: "GMUNC: Gunn Model UN Conference",
						date: "October 24, 2020",
						location: "Henry M. Gunn High School",
						image: data.gmunc,
						text: `Gunn Model United Nations Conference is our first conference of the year, and the one where we always take the most novices too. Fun fact: Monta Vista won the Best Delegation award at GMUNC for 3 years in a row!`,
					},
					{
						name: "SMUNC: Stanford Model UN Conference",
						date: "November 12, 2020 - November 15, 2020",
						location: "Stanford University",
						image: data.smunc,
						text: `Our second conference of the year, Stanford Model United Nations Conference is a competitive one mainly for veterans and varsity members. SMUNC is an intensive 3 days full of 5 committee sessions that will leave you exhausted, but happy that you had such a good time!
`,
					},
					{
						name:
							"SCVMUN: Silicon Valley Model United Nations Conference",
						date: "January 29, 2021 - January 30, 2021",
						location: "Santa Teresa High School",
						image: data.smunc,
						text:
							"Santa Clara Valley Model United Nations Conference is our third conference of the year, and the one where we recommend to all members – novice or veteran. Participating at SCVMUN is a great way to get used to more difficult conferences, such as SMUNC, NAIMUN, and BMUN.",
					},
					{
						name:
							"NAIMUN: North American Invitational Model United Nations Conference",
						date: "February 11, 2021 - February 14, 2021",
						location: "Georgetown University",
						image: data.smunc,
						text:
							" Often recognized as the most difficult conference of the year to many delegates, the North American Invitational Model United Nations Conference is an extremely challenging but thrilling experience. Though hard and tiring, we’re sure that you will enjoy meeting a lot of new people and making large improvements in your MUN abilities. NAIMUN is also our first overnight conference, located in Washington D.C., a 4-5 night stay and plane flight away.",
					},
					{
						name: "BMUN: Berkeley Model United Nations Conference",
						date: "February 26, 2021 - February 28, 2021",
						location: "University of California, Berkeley",
						image: data.smunc,
						text:
							"Our fifth conference of the year, Berkeley Model United Nations Conference, is meant for veterans and varsity members. BMUN is tough, but we’re sure that you will have such a great time meeting members from all over the world. It’s also a great way to analyze and practice your speech skills in a group of more experienced delegates. BMUN is our second overnight conference, located in nearby Berkeley, California, including a 2-night stay and stay at a hotel in Berkeley.\n",
					},
					{
						name: "SBMUN: South Bay Model United Nations",
						date: "", // TODO when available
						location: "Homestead High School",
						image: data.smunc,
						text:
							"South Bay Model United Nations Conference is our sixth conference of the year, and the one where students can continue practicing MUN skills with other delegates from the Bay Area. MUN conferences are rare in the spring season, so this is a great way for you to keep honing on your MUN abilities. ",
					},
					{
						name: "DMUNC: Davis Model United Nations Conference",
						date: "May 15, 2020 - May 16, 2020",
						location: "University of California, Davis",
						image: data.dmunc,
						text:
							"Our final conference of the year, Davis Model United Nations Conference, is an excellent way for you to present your accumulated speech skills throughout the school year in one big committee. DMUNC has a variety of both novices and experienced members, and we’re sure that you will do great after practicing for so long! DMUNC is our last overnight conference, including a likely 2-night stay at a hotel near Davis Campus.\n",
					},
				].map(({ name, date, location, image, text }, i) => {
					return (
						<HorizontalCard
							key={i}
							subtitle={`${date} | ${location}`}
							title={name}
							image={image}
							// buttonText={
							// 	i === 2
							// 		? "Registration Now Open: Login to Continue"
							// 		: undefined
							// }
							// TODO: when a conference comes up
						>
							{text}
						</HorizontalCard>
					);
				})}
			</Main>
		</Layout>
	);
}
export const query = graphql`
	query ConferencesPageQuery {
		gmunc: file(relativePath: { eq: "conferences/gmunc.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
		smunc: file(relativePath: { eq: "conferences/smunc.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
		dmunc: file(relativePath: { eq: "conferences/dmunc.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
