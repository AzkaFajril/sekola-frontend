import News from "../pages/berita/News";
import Prestasi from "../pages/prestasi";

import MapsContact from "./contact-saran/maps";
import Hero from "./hero";

import KepalaSekolah from "./kepsek";
import LinkTerkait from "./link-terkait";
import BannerPpdb from "./ppdb/banner";


export default function ConfigLayout(){
    return(
       <div>
        <Hero/>
        <LinkTerkait />
        <KepalaSekolah/>
        <BannerPpdb/>
        <News/>
        <Prestasi/>
        <MapsContact/>
       </div>
    )
}