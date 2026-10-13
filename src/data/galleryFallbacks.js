import redStar from '../assets/IM/redstartransportation copy.png'
import webProject from '../assets/IM/iStock-1181696848 copy 2.jpg'
import chays from '../assets/IM/chaysalterations copy.png'
import restaurantMenu from '../assets/Restaurant Menu.png'
import businessCard2026 from '../assets/BusinessCard2026.png'
import cdlThumbnail from '../assets/cdl_thumbnail.png'
import emailAssistant from '../assets/email-assistant-thumbnail.png'

import sanFrancisco from '../assets/TRA/San Francisco copy.png'
import paris from '../assets/TRA/Paris copy.png'
import pisa from '../assets/TRA/Pisa copy.png'
import sintra from '../assets/TRA/Sintra copy.png'
import firenze from '../assets/TRA/Firenze.png'
import campNou from '../assets/TRA/Camp Nou copy.png'
import london from '../assets/TRA/London.png'
import cambridge from '../assets/TRA/Cambridge copy.png'
import warsawa from '../assets/TRA/Warsawa copy.png'
import chihenitza from '../assets/TRA/Chihenitza copy.png'
import peña from '../assets/TRA/Peña copy.png'
import hawaii from '../assets/TRA/Hawaii copy.png'
import inframundo from '../assets/TRA/Inframundo copy.png'
import africa from '../assets/TRA/Africa.png'
import capetown from '../assets/TRA/Capetown.png'
import cristoRedentor from '../assets/TRA/Cristo Redentor.png'
import zocalo from '../assets/TRA/Zocalo copy.png'
import coliseo from '../assets/TRA/Coliseo.png'
import bryce from '../assets/TRA/Bryce.png'
import escalante from '../assets/TRA/Escalante.png'
import escalante2 from '../assets/TRA/Escalante2.png'
import volcano from '../assets/TRA/Volcano copy.png'
import roadToHannah from '../assets/TRA/Road to Hannah.png'
import helicopter from '../assets/TRA/Helicopter.png'
import couple from '../assets/TRA/Couple copy.png'
import prazaCom from '../assets/TRA/Praza do Com copy.png'
import sagradaFamilia from '../assets/TRA/Sagrada Familia.png'
import bahamas from '../assets/TRA/bahamas.png'
import shark from '../assets/TRA/Shark copy.png'
import kiss from '../assets/TRA/Kiss copy.png'

import thumbWebDev from '../assets/Thumbnails copy/WebDevelopmentThumbnail.png'
import thumbFitness from '../assets/Thumbnails copy/Fitness.png'
import thumbAfterFx from '../assets/Thumbnails copy/AfterEffectsThumbnail.png'
import thumbDance from '../assets/Thumbnails copy/DanceThumbnail.png'

import student from '../assets/conimages/student.png'
import planetBookCover from '../assets/conimages/PlanetBookCover.png'
import busImage from '../assets/conimages/Bus-Image.png'
import hawaiianPamphlet from '../assets/conimages/Hawaiian-pamphlet.png'
import halloween from '../assets/conimages/halloween.png'
import red from '../assets/conimages/red.png'
import watercolor from '../assets/conimages/Watercolor.png'
import hiring from '../assets/conimages/Hiring.png'
import volendam from '../assets/conimages/Volendam-copy.png'
import cincoDeMayo from '../assets/conimages/CindoDeMayo.png'
import bigBites from '../assets/conimages/BigBitesHero-150x150.png'
import energy from '../assets/conimages/energy.png'
import bus from '../assets/conimages/bus.png'
import redstarLogo from '../assets/conimages/Redstarlogo.png'
import magazine from '../assets/conimages/magazine.png'
import climbing from '../assets/conimages/climbing.png'
import pencils from '../assets/conimages/pencils.png'
import frontPage from '../assets/conimages/New-Front_page-copy-1024x614.png'
import kidonbus from '../assets/conimages/Kidonbus.png'
import universalLogo from '../assets/conimages/univeral-transportation-logo-300x104.png'
import facemask from '../assets/conimages/facemask.png'
import outdoors from '../assets/conimages/Outdoors.png'

export const fallbackProjects = [
  {
    id: 1,
    title: 'CDL Elite Recruitment',
    image_url: cdlThumbnail,
    external_url: 'https://cdl-drivers.vercel.app',
    featured: true,
    description: 'A hiring platform that matches CDL drivers with transportation employers, using AI to screen license class and endorsements.',
    role: 'Solo developer: design, frontend, backend',
    result: '[e.g., 120 drivers signed up in month one]',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Claude API', '[your stack]'],
    links: [
      { label: 'Live demo', url: 'https://cdl-drivers.vercel.app', type: 'demo' },
      { label: 'GitHub', url: '', type: 'github' },
      { label: 'Case study', url: '', type: 'study' },
    ],
    previewType: 'video',
    previewUrl: null,
    previewDuration: '0:60',
  },
  {
    id: 2,
    title: 'Red Star Transportation',
    image_url: redStar,
    external_url: 'https://redstartransportation.com/',
    featured: false,
    description: 'Booking and quote site for a Utah charter and school bus company.',
    role: 'Lead developer and brand designer, client work',
    result: '[e.g., online quote requests up 40%]',
    technologies: ['WordPress', 'PHP', 'ACF'],
    links: [
      { label: 'Live site', url: 'https://redstartransportation.com/', type: 'site' },
      { label: 'Private client repo', url: '', type: 'repo' },
    ],
    previewType: 'image',
    previewUrl: null,
  },
  {
    id: 3,
    title: "Chay's Alterations",
    image_url: chays,
    external_url: null,
    featured: false,
    description: 'Custom alterations and tailoring service website.',
    role: 'Full-stack developer and designer',
    result: '',
    technologies: ['React', 'CSS'],
    links: [],
    previewType: null,
  },
  {
    id: 4,
    title: 'Catch of the Day Menu',
    image_url: restaurantMenu,
    external_url: 'https://catch-of-the-day-menu.vercel.app/store/sirnetz',
    featured: false,
    description: 'Restaurant menu management system with ordering capabilities.',
    role: 'Full-stack developer',
    result: '',
    technologies: ['React', 'Firebase', 'CSS'],
    links: [
      { label: 'Live demo', url: 'https://catch-of-the-day-menu.vercel.app/store/sirnetz', type: 'demo' },
    ],
    previewType: null,
  },
  {
    id: 5,
    title: 'Business Card 2026',
    image_url: businessCard2026,
    external_url: 'https://businesscard-kohl.vercel.app',
    featured: false,
    description: 'Interactive digital business card portfolio.',
    role: 'Designer and developer',
    result: '',
    technologies: ['React', 'Vite', 'CSS'],
    links: [
      { label: 'Live demo', url: 'https://businesscard-kohl.vercel.app', type: 'demo' },
    ],
    previewType: null,
  },
  {
    id: 6,
    title: 'Email Assistant',
    image_url: emailAssistant,
    external_url: 'https://mailassist-ai.vercel.app',
    featured: false,
    description: 'AI-powered email assistant tool for managing communications.',
    role: 'Full-stack developer',
    result: '',
    technologies: ['React', 'Node.js', 'Claude API'],
    links: [
      { label: 'Live demo', url: 'https://mailassist-ai.vercel.app', type: 'demo' },
    ],
    previewType: null,
  },
  {
    id: 7,
    title: 'Web Project',
    image_url: webProject,
    external_url: null,
    featured: false,
    description: 'Web development portfolio project.',
    role: 'Developer',
    result: '',
    technologies: ['React', 'CSS'],
    links: [],
    previewType: null,
  },
]

export const fallbackPhotos = [
  { id: 1, title: 'Hawaii', category: 'Pacific', image_url: hawaii },
  { id: 2, title: 'Cristo Redentor', category: 'Latin America', image_url: cristoRedentor },
  { id: 3, title: 'Bryce', category: 'USA', image_url: bryce },
  { id: 4, title: 'Peña', category: 'Mexico', image_url: peña },
  { id: 5, title: 'Paris', category: 'Europe', image_url: paris },
  { id: 6, title: 'Helicopter', category: 'Adventure', image_url: helicopter },
  { id: 7, title: 'Warsawa', category: 'Europe', image_url: warsawa },
  { id: 8, title: 'Escalante', category: 'USA', image_url: escalante },
  { id: 9, title: 'Capetown', category: 'Africa', image_url: capetown },
  { id: 10, title: 'Zocalo', category: 'Mexico', image_url: zocalo },
  { id: 11, title: 'Bahamas', category: 'Caribbean', image_url: bahamas },
  { id: 12, title: 'San Francisco', category: 'USA', image_url: sanFrancisco },
  { id: 13, title: 'Chihenitza', category: 'Mexico', image_url: chihenitza },
  { id: 14, title: 'Camp Nou', category: 'Europe', image_url: campNou },
  { id: 15, title: 'Inframundo', category: 'Mexico', image_url: inframundo },
  { id: 16, title: 'Volcano', category: 'Pacific', image_url: volcano },
  { id: 17, title: 'London', category: 'Europe', image_url: london },
  { id: 18, title: 'Firenze', category: 'Europe', image_url: firenze },
  { id: 19, title: 'Couple', category: 'People', image_url: couple },
  { id: 20, title: 'Sintra', category: 'Europe', image_url: sintra },
  { id: 21, title: 'Road to Hannah', category: 'USA', image_url: roadToHannah },
  { id: 22, title: 'Coliseo', category: 'Latin America', image_url: coliseo },
  { id: 23, title: 'Cambridge', category: 'Europe', image_url: cambridge },
  { id: 24, title: 'Sagrada Familia', category: 'Europe', image_url: sagradaFamilia },
  { id: 25, title: 'Escalante 2', category: 'USA', image_url: escalante2 },
  { id: 26, title: 'Praza do Com', category: 'Europe', image_url: prazaCom },
  { id: 27, title: 'Africa', category: 'Africa', image_url: africa },
  { id: 28, title: 'Pisa', category: 'Europe', image_url: pisa },
  { id: 29, title: 'Shark', category: 'Adventure', image_url: shark },
  { id: 30, title: 'Kiss', category: 'People', image_url: kiss },
]

export const fallbackVideos = [
  { id: 1, title: 'Web Development', vimeo_id: '538869315', image_url: thumbWebDev },
  { id: 2, title: 'Fitness', vimeo_id: '523344163', image_url: thumbFitness },
  { id: 3, title: 'After Effects', vimeo_id: '552132752', image_url: thumbAfterFx },
  { id: 4, title: 'Dance', vimeo_id: '520780833', image_url: thumbDance },
  { id: 5, title: 'Redneck Mud', vimeo_id: '1096817983', image_url: null },
  { id: 6, title: 'Red Star Transportation', vimeo_id: '454437639', image_url: null },
  { id: 7, title: 'Westerner', vimeo_id: '549420092', image_url: null },
  { id: 8, title: 'Wedding — Bill & Lucy', vimeo_id: '562590545', image_url: null },
  { id: 9, title: 'Wedding — Chelyse & Josh', vimeo_id: '562597775', image_url: null },
]

export const fallbackConsulting = [
  { id: 1, title: 'Student', image_url: student },
  { id: 2, title: 'Planet Book Cover', image_url: planetBookCover },
  { id: 3, title: 'Bus Image', image_url: busImage },
  { id: 4, title: 'Hawaiian Pamphlet', image_url: hawaiianPamphlet },
  { id: 5, title: 'Halloween', image_url: halloween },
  { id: 6, title: 'Red', image_url: red },
  { id: 7, title: 'Watercolor', image_url: watercolor },
  { id: 8, title: 'Hiring', image_url: hiring },
  { id: 9, title: 'Volendam', image_url: volendam },
  { id: 10, title: 'Cinco de Mayo', image_url: cincoDeMayo },
  { id: 11, title: 'Big Bites Hero', image_url: bigBites },
  { id: 12, title: 'Energy', image_url: energy },
  { id: 13, title: 'Bus', image_url: bus },
  { id: 14, title: 'Red Star Logo', image_url: redstarLogo },
  { id: 15, title: 'Magazine', image_url: magazine },
  { id: 16, title: 'Climbing', image_url: climbing },
  { id: 17, title: 'Pencils', image_url: pencils },
  { id: 18, title: 'Front Page', image_url: frontPage },
  { id: 19, title: 'Kid on Bus', image_url: kidonbus },
  { id: 20, title: 'Universal Transportation', image_url: universalLogo },
  { id: 21, title: 'Face Mask', image_url: facemask },
  { id: 22, title: 'Outdoors', image_url: outdoors },
]
