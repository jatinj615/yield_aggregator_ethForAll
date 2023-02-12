import TabButton from 'components/Common/TabButton';
import { Grid, styled } from '@mui/material';
import TopbarInterface from 'interfaces/topbar.interface';
import { includes, map } from 'lodash-es';
import { useRouter } from 'next/router';

interface TopbarPanelComponentProps {
  marginright: string;
  active: boolean;
}

const TopbarPanelComponent = styled(Grid)(({ theme }) => ({
  color: 'darkslategray',
  backgroundColor: theme.palette.background.paper,
  padding: 6,
  borderRadius: '1.75rem',
  width: 'fit-content'
}));

const ModifiedTabButton = styled(TabButton, {
  // ? should these props be passed even to the actual html component, include any props which you only want for this styled block
  shouldForwardProp: (prop) => !includes(['active'], prop)
})<TopbarPanelComponentProps>({}, ({ theme, marginright, active = false }) => {
  let basicStyling: any = {
    marginRight: marginright
  };

  // ? if it's not active then make it look dull
  if (!active) {
    basicStyling = {
      ...basicStyling,
      backgroundColor: 'transparent',
      color: theme.palette.action.disabled,
      '&:hover': {
        color: theme.palette.primary.contrastText
      }
    };
  }

  return basicStyling;
});

const Topbar = ({ items }: { items: TopbarInterface[] }) => {
  const router = useRouter();

  // * redirect route to a certain page
  function routeLink(url: string) {
    router.push(url);
  }

  // ? if the pattern matches
  function isPatternMatch(pathname: string, pattern: RegExp) {
    return pattern?.test(pathname);
  }

  return (
    <TopbarPanelComponent item>
      {map(items, ({ icon, link, text, patterns = [/(?!.*)./] }, index) => {
        let props = { marginright: '' };

        // ? if it's not the last item then pass a margin
        if (index < items.length - 1) {
          props.marginright = '1rem';
        }

        return (
          <ModifiedTabButton
            startIcon={icon()}
            key={link}
            variant="contained"
            // TODO patterns to support the entire array
            active={router.pathname === link || isPatternMatch(router.pathname, patterns[0])}
            onClick={() => routeLink(link)}
            {...props}
          >
            {text}
          </ModifiedTabButton>
        );
      })}
    </TopbarPanelComponent>
  );
};

export default Topbar;
