import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicPortfolio } from "../api/portfolioApi";
import profilepic from "../assets/profilepic.jpeg";


function PublicPortfolio() {

    const { username } = useParams();

    const [portfolio, setPortfolio] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadPortfolio(){

            try{

                const data = await getPublicPortfolio(username);

                setPortfolio(data);

            }catch(err){

                console.log(err);

            }finally{

                setLoading(false);

            }

        }

        loadPortfolio();

    },[username]);

    if(loading){

        return <h2 style={{textAlign:"center"}}>Loading Portfolio...</h2>

    }

    if(!portfolio){

        return <h2 style={{textAlign:"center"}}>Portfolio Not Found</h2>

    }

    return (

        <div className="max-w-5xl mx-auto p-10">

            <div className="text-center">

                <img

                    src={portfolio.photo || "profilepic"}

                    alt="profile"

                    className="w-36 h-36 rounded-full mx-auto mb-6"

                />

                <h1 className="text-4xl font-bold">

                    {portfolio.fullName}

                </h1>

                <p className="text-xl">

                    {portfolio.title}

                </p>

                <p className="mt-3">

                    {portfolio.location}

                </p>

                <p className="mt-5">

                    {portfolio.bio}

                </p>

            </div>

            <hr className="my-10"/>

            <h2 className="text-2xl font-bold mb-4">

                Skills

            </h2>

            <div className="flex flex-wrap gap-3">

                {portfolio.skills.map(skill=>(

                    <span

                        key={skill._id}

                        className="px-3 py-2 rounded bg-purple-100"

                    >

                        {skill.name}

                    </span>

                ))}

            </div>

            <hr className="my-10"/>

            <h2 className="text-2xl font-bold mb-5">

                Projects

            </h2>

            {

                portfolio.projects.map(project=>(

                    <div

                        key={project._id}

                        className="border rounded-xl p-5 mb-5"

                    >

                        <h3 className="text-xl font-bold">

                            {project.title}

                        </h3>

                        <p className="my-3">

                            {project.description}

                        </p>

                        <p>

                            {project.techStack.join(", ")}

                        </p>

                        <div className="mt-4 flex gap-5">

                            <a

                                href={project.github}

                                target="_blank"

                            >

                                Github

                            </a>

                            <a

                                href={project.live}

                                target="_blank"

                            >

                                Live Demo

                            </a>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default PublicPortfolio;