import React from 'react';
import { QRCodeSVG  } from 'qrcode.react';

const QRCodeComponent = ({ url, size = 128 }) => {
  if (!url) return null;
  return (
    <div style={{ display: 'inline-block', background: '#fff', padding: 8, borderRadius: 8 }}>
      <QRCodeSVG  value={url} size={size} />
    </div>
  );
};

export default QRCodeComponent;