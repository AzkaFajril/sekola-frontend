import News from "../pages/berita/News";
import Prestasi from "../pages/prestasi";

import MapsContact from "./contact-saran/maps";
import Home from "./Home/index";

import KepalaSekolah from "./kepsek";
import LinkTerkait from "./link-terkait";


export default function ConfigLayout(){
    return(
       <div>
        <Home/>
        <LinkTerkait />
        <KepalaSekolah/>
        <News/>
        <Prestasi/>
        <MapsContact/>
       </div>
    )
}