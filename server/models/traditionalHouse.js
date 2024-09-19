module.exports = (sequelize, DataTypes) => {
    const TraditionalHouse = sequelize.define('TraditionalHouse', {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      contact_person: {
        type: DataTypes.STRING(13),
        allowNull: false
      },
      open: {
        type: DataTypes.TIME,
        allowNull: false
      },
      close: {
        type: DataTypes.TIME,
        allowNull: false
      },
      ticket_price: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      geom: {
        type: DataTypes.GEOMETRY,
        allowNull: true
      },
      lat: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
      },
      lng: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
      },
      video_url: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      tableName: 'traditional_house',
      timestamps: false
    });
  
    TraditionalHouse.associate = models => {
      TraditionalHouse.hasMany(models.GalleryTraditionalHouse, {
        foreignKey: 'traditional_house_id'
      });
    };
  
    return TraditionalHouse;
  };
  