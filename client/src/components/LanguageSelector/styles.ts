import { Select, outlinedInputClasses } from '@mui/material';
import { styled } from '@mui/system';
import colors from '@global/colors';

export const StyledSelect = styled(Select<string>)`
  color: ${colors.WHITE};

  & .${outlinedInputClasses.notchedOutline} {
    border-color: ${colors.GREY_DARKER};
  }

  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: ${colors.GREY_DARKER};
  }

  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: ${colors.GREY_DARKER} !important;
  }
`;
