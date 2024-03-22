import { RequestHandler } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
});

lorem.format = 'html';

const generate_lorem: RequestHandler = (req, res) => {
  res.send(lorem.generateParagraphs(parseInt(req.params.qtd)));
};

export default generate_lorem;
