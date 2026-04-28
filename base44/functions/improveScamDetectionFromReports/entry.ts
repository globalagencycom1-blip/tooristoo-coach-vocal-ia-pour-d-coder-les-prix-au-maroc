import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all verified scam reports
    const reports = await base44.entities.ScamReport.filter(
      { status: 'verified' },
      '-confirmations',
      100
    );

    if (reports.length === 0) {
      return Response.json({ message: 'No verified reports to process', updates: 0 });
    }

    // Aggregate scam patterns by category and location
    const patterns = {};
    const highRiskCombinations = [];

    reports.forEach(report => {
      const key = `${report.category}_${report.location}`;
      if (!patterns[key]) {
        patterns[key] = {
          category: report.category,
          location: report.location,
          totalScams: 0,
          avgOvercharge: 0,
          scamTypes: {},
          pricePoints: [],
        };
      }

      patterns[key].totalScams += 1;
      patterns[key].pricePoints.push(report.price_asked);
      
      if (report.scam_type) {
        patterns[key].scamTypes[report.scam_type] = (patterns[key].scamTypes[report.scam_type] || 0) + 1;
      }

      // Track high-risk combinations (3+ reports)
      if (patterns[key].totalScams >= 3) {
        const existingCombo = highRiskCombinations.find(c => c.key === key);
        if (existingCombo) {
          existingCombo.count = patterns[key].totalScams;
        } else {
          highRiskCombinations.push({
            key,
            category: report.category,
            location: report.location,
            count: patterns[key].totalScams,
          });
        }
      }
    });

    // Calculate statistics for each pattern
    Object.values(patterns).forEach(pattern => {
      if (pattern.pricePoints.length > 0) {
        pattern.avgOvercharge = pattern.pricePoints.reduce((a, b) => a + b) / pattern.pricePoints.length;
      }
    });

    return Response.json({
      message: 'Scam detection patterns processed',
      patternCount: Object.keys(patterns).length,
      highRiskAreas: highRiskCombinations.sort((a, b) => b.count - a.count).slice(0, 10),
      totalReportsProcessed: reports.length,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});