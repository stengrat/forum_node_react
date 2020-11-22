import axios from 'axios';
import {db} from './firebase';

async function listPosts() {
    const query = db.collection("post")
        .orderBy("userId")
        .limit(50);
    return await query.get();
}

async function list() {
    let [users, posts] = await Promise.all([
        axios.get("/users"),
        listPosts()
    ]);

    //Gera um mapa
    let userMap = users.data.reduce((m, u) => {
        let {id, ...user} = u;
        m[id] = user;
        return m;
    }, {});

    //Substituo o user com base no mapa
    posts = posts.docs.map(p => {
        let {userId, ...post} = p.data();
        post.user = userMap[userId];
        return post;
    });
    return posts;
}

async function postById(id) {
    const query = db.collection("post")
        .where("uid","==", id);
    return await query.get();
}

async function listPost(id) {
    let [post] = await Promise.all([
        postById(id)
    ]);
    post = post.docs.map(p => {
        let {...post} = p.data();
        return post;
    });

    return post
}

async function listComentsByPostId(id){
    const query = db.collection("comentarios")
        .where("postid", "==", id)
    return await query.get();
}

async function getUserById(id){
    const query = db.collection("usuarios")
        .where("uid", "==", id)
    return await query.get();
}

async function listUsuario(id){
    let [usuario] = await Promise.all([
        getUserById(id)
    ]);
    usuario = usuario.docs.map(u => {
        let {...usuario} = u.data();
        return usuario;
    });

    return usuario
}

async function listComentarios(id) {
    let [comentarios] = await Promise.all([
        listComentsByPostId(id)
    ]);
    comentarios = comentarios.docs.map(p => {
        let {...comentarios} = p.data();
        return comentarios;
    });

    return comentarios
}




export {list, listPost, listComentarios, listUsuario};