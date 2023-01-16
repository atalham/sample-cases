import { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { writeStorage } from '@rehooks/local-storage';
// krg components
import KrgHeader from '@kargo/component-library-react.krg-header';

// components
import Toolbar from './toolbar.react';

import { CREATIVE_FORMAT_ENUM } from '@kargo/component-library-react.krg-shared';
import CreativeFormatSelector from '../../components/creative-format-selector';
import { routes } from '../../components/router/app-router.helper';
import classes from './creative-formats.module.scss';
import { FormatsWithCount } from './shared/interface';
import UserMenu from '../../components/user-menu';
import HelpMenu from '../../components/help-menu';

const CreativeFormats: FC = () => {
  const history = useHistory();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [selectedFormats, setSelectedFormats] = useState<CREATIVE_FORMAT_ENUM[]>([]);
  const [formatsWithCount, setFormatsWithCount] =
    useState<FormatsWithCount[]>();

  const headerActionContainer = () => {
    return (
      <Grid container>
        <HelpMenu />
        <div className={classes.divider}/>
        <UserMenu />
      </Grid>
    );
  };

  const onChange = (types: FormatsWithCount[]) => {
    const newTypes = types.filter(type => type.count !== 0).map(item => item.type);
    setFormatsWithCount(types);
    setSelectedFormats(newTypes);
  };

  const handleContinue = () => {
    const tmpFormats: CREATIVE_FORMAT_ENUM[] = [];
    selectedFormats.forEach((format) => {
      const countOfFormat = formatsWithCount?.find(item => item.type === format)?.count;
      let index = 0;
      while (index < (countOfFormat || 0)) {
        tmpFormats.push(format);
        index = index + 1;
      }
    });
    writeStorage(
      'creativeTypes',
      tmpFormats.sort((a, b) => a - b).map(x => x.toString()),
    );
    history.push(routes.builder(campaignId));
  };

  return (
    <Grid container justifyContent="center">
      <KrgHeader
        headerType="composer"
        position="sticky"
        actionContainer={headerActionContainer()}
        onLogoClick={() => history.push(routes.main())}
      />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Toolbar
            onSubmit={handleContinue}
            submitDisabled={selectedFormats.length === 0}
          />
        </Grid>
        <Grid className={classes.formatsWrapper} item>
          <CreativeFormatSelector
            selectedFormats={selectedFormats}
            onToggle={onChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreativeFormats;
