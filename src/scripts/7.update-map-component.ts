import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import prependFile from 'prepend-file';

// ----------------------------------------------------------------------

const template = `import mapboxgl from 'mapbox-gl';

// @ts-ignore
// eslint-disable-next-line
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker')?.default;
`;

const prependText = `/* eslint-disable perfectionist/sort-imports */
import 'src/utils/mapboxgl'\n`;

// ----------------------------------------------------------------------

type Props = {
  isTypeScript: boolean;
};

export function updateMapComponent({ isTypeScript }: Props) {
  console.log(
    chalk.blue(
      `⚡️ Generating ${chalk.magenta(`src/utils/mapboxgl.${isTypeScript ? 'ts' : 'js'}`)}.`
    )
  );

  console.log(
    chalk.blue(
      `🗺️  Updating ${chalk.magenta(
        `src/sections/contact/contact-map.${isTypeScript ? 'tsx' : 'jsx'}`
      )}.`
    )
  );

  console.log(
    chalk.blue(
      `🗺️  Updating ${chalk.magenta(
        `src/sections/_examples/extra/map-view/index.${isTypeScript ? 'tsx' : 'jsx'}`
      )}.`
    )
  );

  fs.writeFileSync(
    path.resolve(process.cwd(), `./src/utils/mapboxgl.${isTypeScript ? 'ts' : 'js'}`),
    template
  );

  prependFile(
    `./src/sections/_examples/extra/map-view/index.${isTypeScript ? 'tsx' : 'jsx'}`,
    prependText
  );

  prependFile(`./src/sections/contact/contact-map.${isTypeScript ? 'tsx' : 'jsx'}`, prependText);
}
