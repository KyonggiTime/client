'use client'

import Image from "next/image";
import SuwonCampusMap from '@/public/suwon_map.png';

export default function Map() {
	return (
		<>
			<Image src={SuwonCampusMap} alt={'수원캠퍼스 지도'}/>
		</>
	);
}
