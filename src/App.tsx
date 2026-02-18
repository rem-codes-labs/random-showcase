import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMemo, useState } from "react";
import { Link as RouterLink, Route, Routes, useParams } from "react-router-dom";
import { categories, ideas } from "./data/ideas";
import { employees } from "./data/employees";
import { tokens } from "./theme";
import { loadFavorites, saveFavorites } from "./utils/storage";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/#gallery" },
  { label: "About", to: "/#about" },
  { label: "Admin", to: "/admin" },
  { label: "Team", to: "/team" },
];

const heroImage =
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1800&q=80&fm=webp";

function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites());

  const toggle = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveFavorites(next);
      return next;
    });
  };

  return { favorites, toggle };
}

function Layout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawer = useMemo(
    () => (
      <Box sx={{ p: 3 }} role="presentation" onClick={() => setDrawerOpen(false)}>
        <Stack spacing={2}>
          {navItems.map((item) => (
            <Link key={item.label} component={RouterLink} to={item.to} underline="none">
              <Typography variant="h6">{item.label}</Typography>
            </Link>
          ))}
        </Stack>
      </Box>
    ),
    []
  );

  return (
    <Box>
      <AppBar position="sticky" elevation={0} sx={{ background: tokens.paper }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography component={RouterLink} to="/" variant="h6" sx={{ fontWeight: 700 }}>
            Random Showcase
          </Typography>
          <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => (
              <Link key={item.label} component={RouterLink} to={item.to} underline="none">
                <Typography variant="body1">{item.label}</Typography>
              </Link>
            ))}
          </Stack>
          <IconButton
            aria-label="open navigation"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>
      {children}
      <Divider />
      <Box sx={{ background: "#fff", py: 4 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
            <Box>
              <Typography variant="h6" gutterBottom>
                Random Showcase
              </Typography>
              <Typography variant="body2">
                Generate, filter, and save project sparks for your next build.
              </Typography>
            </Box>
            <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
              {navItems.map((item) => (
                <Link key={item.label} component={RouterLink} to={item.to} underline="hover">
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Stack>
          <Typography variant="caption" display="block" sx={{ mt: 3 }}>
            © 2026 Random Showcase. Placeholder assets and content.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

function HomePage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [complexity, setComplexity] = useState<number>(3);
  const [query, setQuery] = useState("");
  const [idea, setIdea] = useState(ideas[0]);
  const { favorites, toggle } = useFavorites();

  const filteredIdeas = useMemo(() => {
    return ideas.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesComplexity = item.complexity <= complexity;
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesComplexity && matchesQuery;
    });
  }, [category, complexity, query]);

  const generateIdea = () => {
    const pool = filteredIdeas.length ? filteredIdeas : ideas;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setIdea(next);
  };

  return (
    <Box>
      <Box
        sx={{
          minHeight: { xs: 520, md: 620 },
          color: "white",
          display: "flex",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(11,19,43,0.75), rgba(11,19,43,0.75)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ maxWidth: 680 }}>
            <Typography variant="h1">
              Stuck? Generate. Build. Ship. — Instant project ideas to spark your next move.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              Random Showcase helps makers and creatives discover bite-sized project ideas, filter by
              category and complexity, and save or share favorites — no signup required.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="contained" color="secondary" onClick={generateIdea}>
                Generate an idea
              </Button>
              <Button variant="outlined" color="inherit" href="#gallery">
                Browse categories
              </Button>
            </Stack>
            <Card sx={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
              <CardContent>
                <Typography variant="overline">Generated idea</Typography>
                <Typography variant="h3" sx={{ color: "white" }}>
                  {idea.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {idea.summary}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Chip label={idea.category} sx={{ background: "rgba(255,255,255,0.2)" }} />
                  <Chip label={`Complexity ${idea.complexity}`} />
                  <Chip label={idea.author} variant="outlined" />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={6}>
          <Box id="gallery">
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="baseline">
              <Typography variant="h2">Gallery</Typography>
              <Typography variant="body1" color="text.secondary">
                Filter by category, complexity, or keyword.
              </Typography>
            </Stack>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value as typeof category)}
                      >
                        {categories.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box>
                      <Typography fontWeight={600}>Complexity</Typography>
                      <Slider
                        value={complexity}
                        min={1}
                        max={5}
                        step={1}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setComplexity(value as number)}
                      />
                    </Box>
                    <TextField
                      label="Search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search ideas"
                    />
                    <Button variant="contained" color="secondary" onClick={generateIdea}>
                      Generate idea
                    </Button>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  {filteredIdeas.map((item) => {
                    const isFavorite = favorites.includes(item.id);
                    return (
                      <Grid item xs={12} sm={6} key={item.id}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={item.image}
                            alt={`${item.title} preview`}
                            loading="lazy"
                            srcSet={`${item.image}&w=400 400w, ${item.image}&w=800 800w`}
                            sizes="(max-width: 900px) 100vw, 50vw"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="start">
                              <Box>
                                <Typography variant="h3">{item.title}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {item.summary}
                                </Typography>
                              </Box>
                              <IconButton onClick={() => toggle(item.id)} aria-label="favorite">
                                {isFavorite ? (
                                  <FavoriteIcon color="secondary" />
                                ) : (
                                  <FavoriteBorderIcon />
                                )}
                              </IconButton>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              <Chip label={item.category} size="small" />
                              <Chip label={`Complexity ${item.complexity}`} size="small" />
                            </Stack>
                            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                              {item.date} · {item.author}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box id="about">
            <Typography variant="h2" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 760 }}>
              Random Showcase is a lightweight gallery for sharing and discovering small project
              prompts. Save favorites, spin up a new idea in seconds, and keep your creative energy
              moving.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h2" gutterBottom>
              Team highlights
            </Typography>
            <Grid container spacing={3}>
              {employees.map((employee) => (
                <Grid item xs={12} md={3} key={employee.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={employee.avatar}
                      alt={`${employee.name} portrait`}
                      loading="lazy"
                    />
                    <CardContent>
                      <Typography variant="h3">{employee.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.role}
                      </Typography>
                      <Button component={RouterLink} to={`/team/${employee.id}`} sx={{ mt: 1 }}>
                        View profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Card sx={{ p: 4, background: tokens.midnight, color: "white" }}>
              <Stack spacing={2}>
                <Typography variant="h2" sx={{ color: "white" }}>
                  Admin access
                </Typography>
                <Typography variant="body1">
                  Manage ideas, publish updates, and curate the gallery with a lightweight admin
                  dashboard.
                </Typography>
                <Button variant="contained" color="secondary" component={RouterLink} to="/admin">
                  Open admin
                </Button>
              </Stack>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function AdminPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h2">Admin dashboard</Typography>
          <Typography variant="body1" color="text.secondary">
            Low-fidelity admin UI for managing gallery content. Plug in your auth and backend of
            choice.
          </Typography>
        </Box>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h3">Content list</Typography>
            {ideas.map((item) => (
              <Stack
                key={item.id}
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", md: "center" }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={`${item.title} thumbnail`}
                  sx={{ width: 120, height: 80, objectFit: "cover", borderRadius: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.category} · {item.date} · {item.author}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                  <Button size="small" color="secondary" variant="outlined">
                    Publish
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card>
        <Card sx={{ p: 3 }}>
          <Typography variant="h3" gutterBottom>
            Editor
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Title" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Category" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" fullWidth multiline rows={3} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Tags" fullWidth placeholder="Comma separated" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Thumbnail" fullWidth placeholder="Upload or URL" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Switch />} label="Published" />
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Container>
  );
}

function TeamPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <Typography variant="h2">Meet the team</Typography>
        <Grid container spacing={3}>
          {employees.map((employee) => (
            <Grid item xs={12} md={4} key={employee.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={employee.avatar}
                  alt={`${employee.name} portrait`}
                  loading="lazy"
                />
                <CardContent>
                  <Typography variant="h3">{employee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {employee.role}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {employee.bio}
                  </Typography>
                  <Button component={RouterLink} to={`/team/${employee.id}`} sx={{ mt: 2 }}>
                    View profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

function TeamMemberPage() {
  const { id } = useParams();
  const employee = employees.find((item) => item.id === id) ?? employees[0];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
            <Box
              component="img"
              src={employee.avatar}
              alt={`${employee.name} portrait`}
              sx={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover" }}
            />
            <Box>
              <Typography variant="h2">{employee.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {employee.role}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body1">{employee.bio}</Typography>
          <Box>
            <Typography variant="h3" gutterBottom>
              Favorite tools
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {employee.favoriteStack.map((tool) => (
                <Chip key={tool} label={tool} />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="h3" gutterBottom>
              Spotlight
            </Typography>
            <Typography variant="body1">{employee.spotlight}</Typography>
          </Box>
          <Button component={RouterLink} to="/team" variant="outlined">
            Back to team
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

function CtaBar() {
  return (
    <Box sx={{ background: tokens.midnight, color: "white", py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h2" sx={{ color: "white" }}>
            Ready for your next idea?
          </Typography>
          <Typography variant="body1">
            Generate a fresh prompt, share with your crew, and build something new this week.
          </Typography>
          <Button variant="contained" color="secondary" href="#gallery">
            Explore the gallery
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:id" element={<TeamMemberPage />} />
      </Routes>
      <CtaBar />
    </Layout>
  );
}
