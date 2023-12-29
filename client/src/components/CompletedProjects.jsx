import projects from '../constants/completedProjects.json'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CompletedProjects() {
  return (
    <section>
      <h1 className='text-xl mb-4'>Completed Projects</h1>
      {
        projects.map((project) => (
          <Accordion key={project.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{`${project.id}. ${project.title}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {project.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </section>
  );
}