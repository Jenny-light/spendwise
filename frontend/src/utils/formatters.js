// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Format date for input
  export const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Get category color
  export const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-700',
      Transportation: 'bg-blue-100 text-blue-700',
      Entertainment: 'bg-purple-100 text-purple-700',
      Shopping: 'bg-pink-100 text-pink-700',
      Bills: 'bg-red-100 text-red-700',
      Healthcare: 'bg-green-100 text-green-700',
      Education: 'bg-indigo-100 text-indigo-700',
      Travel: 'bg-yellow-100 text-yellow-700',
      Other: 'bg-gray-100 text-gray-700',
    };
    return colors[category] || colors.Other;
  };
  
  // Get category icon (using emoji)
  export const getCategoryIcon = (category) => {
    const icons = {
      Food: '🍔',
      Transportation: '🚗',
      Entertainment: '🎬',
      Shopping: '🛍️',
      Bills: '📄',
      Healthcare: '🏥',
      Education: '📚',
      Travel: '✈️',
      Other: '📌',
    };
    return icons[category] || icons.Other;
  };
  
  // Calculate percentage
  export const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };