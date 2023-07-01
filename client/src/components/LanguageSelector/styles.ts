import { Select, outlinedInputClasses } from '@mui/material';
import { styled } from '@mui/system';
import colors from '@global/colors';

export const StyledSelect = styled(Select<string>)`
  color: ${colors.TEXT};

  & .${outlinedInputClasses.notchedOutline} {
    border-color: ${colors.TEXT};
  }

  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: ${colors.TEXT};
  }

  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: ${colors.TEXT} !important;
  }
`;
