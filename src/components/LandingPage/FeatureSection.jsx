import { Button, Card, CardContent, Typography, Box, Container } from "@mui/material";

function FeatureSection() {
  return (
    <>
      <Container 
        maxWidth="lg" 
        sx={{ 
          paddingTop: 5, 
          paddingBottom: 5, 
          background: "linear-gradient(180deg, #FFFBCC 0%,rgb(242, 205, 240) 50%)", 
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop:5
        }}
      >
        {/* Heading */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{  
            textAlign: 'center', 
            marginBottom: 4,
            color: "#333", 
            fontWeight: "bold" 
          }}
        >
          Our Key Features
        </Typography>

        {/* Cards Section */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          flexWrap="wrap" 
          gap={4}
        >
          {/* Card 1 */}
          <Card 
            sx={{ 
              maxWidth: 345, 
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", 
              borderRadius: 3, 
              overflow: 'hidden',
              backgroundColor: "#FFF7E1",
              transition: "transform 0.2s, box-shadow 0.2s",
              '&:hover': {
                transform: "translateY(-5px)",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            <CardContent sx={{ padding: 3 }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  marginBottom: 2, 
                  color: "#FF8A00" 
                }}
              >
                Meditation Tracker
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2, color: "#555" }}>
                "Track your mindfulness journey with our Meditation Tracker, set personal goals, and stay consistent on the path to inner peace and well-being."
              </Typography>
            
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card 
            sx={{ 
              maxWidth: 345, 
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", 
              borderRadius: 3, 
              overflow: 'hidden',
              backgroundColor: "#FFF7E1",
              transition: "transform 0.2s, box-shadow 0.2s",
              '&:hover': {
                transform: "translateY(-5px)",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            <CardContent sx={{ padding: 3 }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  marginBottom: 2, 
                  color: "#FF8A00" 
                }}
              >
                Journaling
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2, color: "#555" }}>
                "Easily record your thoughts, reflections, and daily progress in a private space. Our journaling tool supports your self-discovery with simple, intuitive entries."
              </Typography>
              
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card 
            sx={{ 
              maxWidth: 345, 
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", 
              borderRadius: 3, 
              overflow: 'hidden',
              backgroundColor: "#FFF7E1",
              transition: "transform 0.2s, box-shadow 0.2s",
              '&:hover': {
                transform: "translateY(-5px)",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            <CardContent sx={{ padding: 3 }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  marginBottom: 2, 
                  color: "#FF8A00" 
                }}
              >
                Community Forum
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2, color: "#555" }}>
                "Connect, share, and collaborate with like-minded individuals in our Community Forum. Ask questions, exchange ideas, and gain valuable insights in a supportive environment."
              </Typography>
              
            </CardContent>
          </Card>

        </Box>
      </Container>
    </>
  );
}

export default FeatureSection;
