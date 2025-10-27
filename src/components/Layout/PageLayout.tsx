import React from 'react';
import { Box, Paper, Typography, Breadcrumbs, Link } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, breadcrumbs }) => {
  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      <Paper className="max-w-7xl mx-auto rounded-lg shadow-sm overflow-hidden">
        <Box className="p-6">
          {breadcrumbs && (
            <Breadcrumbs className="mb-4">
              <Link href="/" color="inherit">
                Dashboard
              </Link>
              {breadcrumbs.map((item, index) => (
                item.href ? (
                  <Link key={index} href={item.href} color="inherit">
                    {item.label}
                  </Link>
                ) : (
                  <Typography key={index} color="text.primary">
                    {item.label}
                  </Typography>
                )
              ))}
            </Breadcrumbs>
          )}
          
          <Box className="mb-6">
            <Typography variant="h4" component="h1" className="font-semibold text-gray-900">
              {title}
            </Typography>
          </Box>

          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default PageLayout; 