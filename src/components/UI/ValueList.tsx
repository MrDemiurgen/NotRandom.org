import type React from 'react';
import Chip from '@mui/material/Chip';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

interface ValueListProps {
  onClear?: () => void;
  onDelete?: (value: string | number, index: number) => void;
  values?: (string | number)[];
}

const ValueList: React.FC<ValueListProps> = ({ onClear, onDelete, values = [] }) => {
  const isDisabledClear = values.length === 0;

  return (
    <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={1} useFlexGap>
      <Tooltip arrow placement="top" title="Clear">
        <span>
          <IconButton color="secondary" disabled={isDisabledClear} onClick={() => onClear?.()}>
            <DeleteSweepIcon />
          </IconButton>
        </span>
      </Tooltip>
      {values.map((v, index) => (
        // Values can repeat and have no persistent IDs; chips have no local state to preserve.
        // eslint-disable-next-line react/no-array-index-key
        <Chip key={index} label={v} onDelete={() => onDelete?.(v, index)} />
      ))}
    </Stack>
  );
};

export default ValueList;
