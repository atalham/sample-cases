import React, { useEffect, useState } from 'react';
import { ButtonBase, Card, Typography } from '@mui/material';
import KrgCheckbox from '@kargo/component-library-react.krg-checkbox';
import { CREATIVE_FORMAT_ENUM, CREATIVE_FORMATS } from '@kargo/component-library-react.krg-shared';
import { getMedia } from './shared/media';
import useStyles from './krg-creative-format-selector.style';
import KrgSelect from '@kargo/component-library-react.krg-select';

type Props = {
  /**
   * @summary
   * Format card id
   */
  id?: string,
  /**
   * @summary
   * Format card class name
   */
  className?: string,
  /**
   * @summary
   * Format card style
   */
  style?: React.CSSProperties,
  /**
   * @summary
   * Checked state of selector
   * @default
   * false
   */
  checked?: boolean,
  /**
   * @summary
   * Format card variant
   */
  creativeFormat: CREATIVE_FORMAT_ENUM,
  /**
   * @summary
   * Format card title
   */
  customCreativeTitle?: string,
  /**
   * @summary
   * Format card image
   */
  customCreativeImage?: string,
  /**
   * @summary
   * If `true`, the selector will be disabled.
   */
  disabled?: boolean,
  /**
   * @summary
   * Callback fired when the `checked` state is changed.
   * @default
   * false
   */
  onToggle?: (checked: boolean) => void,
  /**
   * @summary
   * Callback fired when the count state is changed.
   */
  onCountChange?: (count: number) => void,
  /**
   * @summary
   * Count from parent
   */
  count?: number,
};

const KrgCreativeFormatSelector = ({
  id,
  className = '',
  style,
  checked = false,
  creativeFormat,
  customCreativeTitle,
  customCreativeImage,
  disabled = false,
  onToggle,
  onCountChange,
  count,
}: Props) => {
  const formatData = CREATIVE_FORMATS[creativeFormat];
  const classes = useStyles({ checked, disabled })();
  const [formatCount, setFormatCount] = useState(count || 0);

  useEffect(
    () => {
      setFormatCount(count || 0);
    },
    [count],
  );

  const onToggleHandler = () => {
    if (checked) {
      onFormatCountChange(0);
    } else {
      onFormatCountChange(1);
    }
    onToggle?.(!checked);
  };

  const onFormatCountChange = (val: number) => {
    setFormatCount(val);
    onCountChange?.(val);
  };

  return (
    <div className={classes.root}>
      <Card id={id} className={`${classes.card} ${className}`} style={style}>
        <ButtonBase
          className={classes.buttonBase}
          onClick={onToggleHandler}
          disabled={disabled}
        >
          <img
            src={customCreativeImage || getMedia(creativeFormat)}
            alt={formatData.title}
          />
          <div className={classes.paragraph}>
            <Typography className={classes.title} variant="body2">
              {customCreativeTitle || formatData.title}
            </Typography>
            <Typography className={classes.resolution} variant="body2">
              {formatData.resolution}
            </Typography>
          </div>
          <KrgCheckbox checked={checked} onToggle={onToggleHandler} />
        </ButtonBase>
      </Card>
      <div
        className={classes.formatCountSelector}
        onClick={e => e.stopPropagation()}
      >
        <KrgSelect
          fullWidth
          options={[
            { text: '0', value: 0 },
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '5', value: 5 },
            { text: '6', value: 6 },
            { text: '7', value: 7 },
            { text: '8', value: 8 },
            { text: '9', value: 9 },
            { text: '10', value: 10 },
          ]}
          onChange={(val) => {
            if (+val === 0) {
              onToggle?.(false);
            } else {
              onToggle?.(true);
            }
            onFormatCountChange(+val);
          }}
          value={formatCount}
        />
      </div>
    </div>
  );
};

export default KrgCreativeFormatSelector;
