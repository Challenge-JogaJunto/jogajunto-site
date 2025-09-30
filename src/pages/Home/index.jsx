import Textarea from "../../components/form/TextArea";
import {useEffect, useState} from "react";
import {FaPhotoVideo, FaSpinner, FaVideo} from "react-icons/fa";
import defaultUser from "../../assets/defaultUser.jpg";
import ContainerDiv from "../../components/Container";
import DefaultModal from "../../components/Dialog";
import Button from "../../components/form/Button";
import InputField from "../../components/form/Input";
import useGlobal from "../../hooks/useGlobal";
import {FormTools} from "../../utils/formTools";
import ImageUploader from "../../components/form/InputImage";
import {toast} from "react-toastify";
import {fetchPosts} from "@/services/posts.js";

export default function Home() {
    const [form, setForm] = useState({
        titulo_pub: "",
        descricao: "",
    });
    const {handleChange} = new FormTools(form, setForm);
    const [selPost, setSelPost] = useState(null);
    const [collapsed, setCollaped] = useState(true);
    const [posts, setPosts] = useState([]);
    const [dialogPub, setDialogPub] = useState(false);
    const {user} = useGlobal();

    const catchPosts = async () => {
        const response = await fetchPosts();
        setPosts(response);
    }

    useEffect(() => {
        catchPosts();
    }, []);

    return (
        <>
            <ContainerDiv className={"p-4"}>
                <div className="w-full flex items-center gap-3">
                    <img
                        src={user ? user.img ?? defaultUser : defaultUser}
                        className="w-[50px] rounded-full"
                        alt="Imagem do usuário"
                    />
                    <InputField
                        type="text"
                        id={"titulo_pub"}
                        value={form.titulo_pub}
                        onChange={(e) => {
                            handleChange(e);
                            setDialogPub(true);
                        }}
                        placeholder="Faça uma publicação"
                    />
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <Button variant={"secondary"} margin={"1rem 0"}>
                        <FaVideo size={20}/>
                        <p className="link">Vídeo</p>
                    </Button>
                    <Button variant={"secondary"} margin={"1rem 0"}>
                        <FaPhotoVideo size={20}/>

                        <p className="link">Fotos</p>
                    </Button>
                </div>
            </ContainerDiv>

            <div className="flex items-center flex-col gap-5 my-3">
                {(posts && posts.length > 0) ? (
                    posts.map((post, index) => {
                        return (
                            <ContainerDiv className={"w-full"} key={`post-${index}`}>
                                <div className="p-5">
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={user ? user.img ?? defaultUser : defaultUser}
                                            className="w-[50px] rounded-full"
                                            alt="Imagem do usuário"
                                        />
                                        <h3 className="title" style={{fontSize: "20px"}}>
                                            {post.autor.nome}
                                        </h3>
                                    </div>
                                    <div className="flex justify-between items-center gap-4 my-5">
                                        <p className="text">{post.descricao.slice(0, 200)}...</p>
                                        <Button
                                            variant={"primary"}
                                            onClick={() =>
                                                setSelPost({
                                                    ...post,
                                                    descricao:
                                                        post.descricao +
                                                        `adipisicing elit. Ut doloribus, iure iusto numquam minima
                  impedit incidunt repellat suscipit quia nam odit ad non?
                  Maxime soluta voluptate omnis obcaecati aperiam fugiat? Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit.
                  Quia, distinctio mollitia, porro atque impedit,
                  corrupti eos fugiat commodi officia id dolorum. Deserunt,
                  minus ratione? Numquam quam eius unde eos, maiores id. Itaque
                  aperiam, iusto deserunt neque, molestiae voluptas consequatur,
                  optio placeat nesciunt aut ducimus laudantium accusantium
                  natus ex doloribus omnis ipsam asperiores odit. Blanditiis
                  voluptatem obcaecati eligendi, quam, architecto iure ipsa,
                  nesciunt alias ipsum debitis voluptates illum. Laborum ex quia
                  illo maiores quod sed nesciunt beatae
                  
                  omnis quisquam error. Repudiandae odit excepturi ea eos
                  voluptatum eius ut, dicta recusandae mollitia libero
                  laudantium numquam commodi id vel officiis. Dignissimos et
                  laudantium facere, beatae fugit unde corrupti. Odit rem
                  voluptates iure, odio corporis soluta totam saepe quisquam
                  neque obcaecati dolores minima repellat esse doloremque natus,
                  dignissimos eveniet eaque! Laudantium minima nihil eos, nemo
                  in deserunt culpa atque aliquam accusantium, possimus
                  architecto perferendis placeat iure ad alias consequatur
                  voluptas quos ut quisquam.`,
                                                })
                                            }
                                        >
                                            <p style={{whiteSpace: "nowrap"}}>Ver mais</p>
                                        </Button>
                                    </div>
                                </div>
                                <img
                                    src={`./pubs/pub-${(index % 4) + 1}.png`}
                                    alt="imagem da publicação"
                                    className="w-full object-cover"
                                    style={{aspectRatio: 1 / 1}}
                                />
                            </ContainerDiv>
                        );
                    })
                ) : (
                    <p className="text my-10">Não foi encontrado nenhuma publicação</p>
                )}
            </div>

            <DefaultModal
                isOpen={dialogPub}
                onClose={() => setDialogPub(false)}
                size="[1024px]"
            >
                <div className="flex flex-col">
                    <h2 className="subtitle">Crie uma nova publicação</h2>
                    <form
                        className="mt-7 flex flex-wrap gap-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            toast.success("Publicação criada com sucesso!");
                            Object.keys(form).forEach((item) => {
                                setForm((prev) => {
                                    return {...prev, [item]: ""};
                                });
                            });
                            setDialogPub(false);
                        }}
                    >
                        <ImageUploader
                            id={"img"}
                            label={"Imagem da publicação"}
                            adicionalStyle={{aspectRatio: 3 / 4, width: "320px"}}
                        />
                        <InputField
                            type="text"
                            label={"Titulo da publicação"}
                            id={"titulo_pub"}
                            value={form.titulo_pub}
                            onChange={handleChange}
                            placeholder="Faça uma publicação"
                        />
                        <Textarea
                            label={"Titulo da publicação"}
                            id={"descricao"}
                            height="320px"
                            value={form.descricao}
                            onChange={handleChange}
                            placeholder="Conteúdo da publicação"
                        />
                        <Button type="submit" variant={"primary"} margin={"0 0 0 auto"}>
                            Publicar
                        </Button>
                    </form>
                </div>
            </DefaultModal>
            {selPost && (
                <DefaultModal
                    isOpen={selPost ? true : false}
                    onClose={() => setSelPost(null)}
                    size="[var(--max-content)]"
                >
                    <div className="flex flex-row-reverse flex-wrap lg:flex-nowrap">
                        <div className="w-full px-5">
                            <div className="flex gap-3 items-center">
                                <img
                                    src={user ? user.img ?? defaultUser : defaultUser}
                                    className="w-[50px] rounded-full"
                                    alt="Imagem do usuário"
                                />
                                <h3 className="title" style={{fontSize: "20px"}}>
                                    {selPost.autor.nome}
                                </h3>
                            </div>
                            <div className="flex justify-between items-center gap-4 my-5">
                                <p className="text">
                                    {collapsed
                                        ? selPost.descricao.slice(0, 300)
                                        : selPost.descricao}
                                    <br/>
                                    <span
                                        className="link text-[var(--primaria)] cursor-pointer"
                                        onClick={() => setCollaped(!collapsed)}
                                    >
                    {collapsed ? "Ver mais" : "Ver menos"}
                  </span>
                                </p>
                            </div>
                            <div>
                                <hr className="border-[var(--primaria)]"/>
                                <div className="flex items-center gap-3 mt-4">
                                    <img
                                        src={user ? user.img ?? defaultUser : defaultUser}
                                        className="w-[50px] rounded-full"
                                        alt="Imagem do usuário"
                                    />
                                    <InputField
                                        type="text"
                                        id={"comment"}
                                        placeholder="Faça um comentário"
                                    />
                                </div>
                            </div>
                        </div>
                        <img
                            src={`./pubs/pub-4.png`}
                            alt="imagem da publicação"
                            className="w-full max-w-[600px] object-cover"
                            style={{aspectRatio: 1 / 1}}
                        />
                    </div>
                </DefaultModal>
            )}
        </>
    );
}
