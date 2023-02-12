import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface IObject {
  [key: string]: any;
}

interface ISearchBarProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  listSelectedValue: string;
  listItems: IObject[];
  onListChange: (event: SelectChangeEvent) => void;
}

export default function SearchBar({ onSearchChange, listSelectedValue, listItems, onListChange }: ISearchBarProps) {
  return (
    // search box and sorting items
    <Grid container item mt={5} mb={3}>
      <Grid item xs={5} mr={2}>
        <FormControl fullWidth>
          <OutlinedInput
            placeholder="Search for tokens or vaults"
            type="text"
            onChange={onSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <Select displayEmpty value={listSelectedValue} onChange={onListChange}>
            {listItems.map((item, index) => (
              <MenuItem key={index} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
