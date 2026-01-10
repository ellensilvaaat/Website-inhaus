import { projectsData } from './index'

export const projectsBySuburb = [
  {
    suburb: 'Paddington',
    slug: 'paddington',
    projects: projectsData.filter(p =>
      p.slug.includes('paddington')
    ),
  },
  {
    suburb: 'Woollahra',
    slug: 'woollahra',
    projects: projectsData.filter(p =>
      p.slug.includes('woollahra')
    ),
  },
  {
    suburb: 'Rose Bay',
    slug: 'rose-bay',
    projects: projectsData.filter(p =>
      p.slug.includes('rose-bay')
    ),
  },
  {
    suburb: 'Bellevue Hill',
    slug: 'bellevue-hill',
    projects: projectsData.filter(p =>
      p.slug.includes('bellevue')
    ),
  },
  {
    suburb: 'Milsons Point',
    slug: 'milsons-point',
    projects: projectsData.filter(p =>
      p.slug.includes('milsons')
    ),
  },
  {
    suburb: 'Redfern',
    slug: 'redfern',
    projects: projectsData.filter(p =>
      p.slug.includes('redfern')
    ),
  },
]

